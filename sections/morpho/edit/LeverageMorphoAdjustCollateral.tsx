import AppCard from '@components/AppCard';
import { LeverageMorphoInstance } from '../../../redux/slices/morpho.scale.types';
import AppTitle from '@components/AppTitle';
import TokenInput from '@components/Input/TokenInput';
import AppButton from '@components/AppButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useTokenData } from '../../../hooks/useTokenData';
import DisplayLabel from '@components/Display/DisplayLabel';
import DisplayOutputAlignedRight from '@components/Display/DisplayOutputAlignedRight';
import AppBox from '@components/AppBox';
import { formatCurrency } from '@utils';
import { formatUnits, parseEther, parseUnits } from 'viem';
import LeverageMorphoActionWithdrawCollateral from './LeverageMorphoActionWithdrawCollateral';
import LeverageMorphoActionSupplyCollateral from './LeverageMorphoActionSupplyCollateral';
import { useAccount } from 'wagmi';

interface Props {
	instance: LeverageMorphoInstance;
}

export default function LeverageMorphoAdjustCollateral({ instance }: Props) {
	const { address } = useAccount();
	const tokenData = useTokenData(instance.collateral, instance.address);
	const [direction, setDirection] = useState<boolean>(false);
	const [amount, setAmount] = useState(0n);
	const [error, setError] = useState('');

	const resultCollateral = BigInt(instance.position.collateral) + (direction ? amount : -amount);
	const resultLTV =
		(BigInt(instance.loanValue) * parseUnits('1', 18 + instance.collateralDecimals)) / (resultCollateral * instance.price);
	const minCollateralRaw =
		(instance.loanValue * parseEther('1') * parseUnits('1', instance.collateralDecimals)) / instance.lltv / instance.price;
	const minCollateral = (minCollateralRaw * parseEther('1.001')) / parseEther('1'); // give some tolerance e.g. 85.999% for 86% LLTV
	const maxWithdraw = instance.position.collateral - minCollateral;

	const isOwner = address != undefined && address.toLowerCase() == instance.owner.toLowerCase();

	const onChangeAmount = (value: string) => {
		const valueBigInt = BigInt(value);
		setAmount(valueBigInt);
	};

	useEffect(() => {
		if (!direction && amount > maxWithdraw) {
			const formatedStr = formatCurrency(formatUnits(maxWithdraw, instance.collateralDecimals));
			setError(`You can not withdraw more then ${formatedStr} ${instance.collateralSymbol}`);
		} else if (direction && amount > tokenData.balance) {
			setError(`Not enough ${instance.collateralSymbol} in your wallet.`);
		} else if (!direction && !isOwner) {
			setError('You are not the owner of this position.');
		} else {
			setError('');
		}
	}, [amount, direction, isOwner, instance.collateralDecimals, instance.collateralSymbol, maxWithdraw, tokenData.balance]);

	return (
		<div className="grid md:grid-cols-2 max-md:grid-cols-1 gap-2">
			<AppCard>
				<AppTitle title="Adjust Collateral" />

				<TokenInput
					symbol={instance.collateralSymbol}
					label="Current Collateral"
					disabled={true}
					value={String(instance.position.collateral)}
					digit={instance.collateralDecimals}
				/>

				<div className="py-4 text-center z-0">
					<AppButton className={`h-10 rounded-full`} width="w-10">
						<FontAwesomeIcon
							icon={direction ? faArrowUp : faArrowDown}
							className="w-6 h-6"
							onClick={() => setDirection(!direction)}
						/>
					</AppButton>
				</div>

				<TokenInput
					symbol={instance.collateralSymbol}
					label={direction ? 'Deposit' : 'Withdraw'}
					value={String(amount)}
					digit={instance.collateralDecimals}
					onChange={onChangeAmount}
					limitLabel="Balance"
					limit={tokenData.balance}
					limitDigit={instance.collateralDecimals}
					reset={0n}
					max={direction ? tokenData.balance : maxWithdraw}
					error={error}
				/>
			</AppCard>

			<AppCard>
				<AppTitle title="Outcome" />

				<AppBox>
					<DisplayLabel label="Result Collateral" />
					<DisplayOutputAlignedRight
						className="pt-2 font-semibold"
						amount={resultCollateral}
						digits={instance.collateralDecimals}
						unit={instance.collateralSymbol}
					/>
				</AppBox>

				<AppBox>
					<DisplayLabel label="Result LTV" />
					<DisplayOutputAlignedRight
						className="pt-2 font-semibold"
						output={`${formatCurrency(formatUnits(resultLTV, 18 - 2))}%`}
					/>
				</AppBox>

				{direction ? (
					<LeverageMorphoActionSupplyCollateral
						disabled={amount == 0n || error.length > 0}
						instance={instance}
						amount={amount}
						allowance={tokenData.allowance}
					/>
				) : (
					<LeverageMorphoActionWithdrawCollateral
						disabled={amount == 0n || error.length > 0}
						instance={instance}
						amount={amount}
					/>
				)}
			</AppCard>
		</div>
	);
}
