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
import { formatUnits, parseEther } from 'viem';
import LeverageMorphoActionRepay from './LeverageMorphoActionRepay';
import LeverageMorphoActionBorrow from './LeverageMorphoActionBorrow';
import { useAccount } from 'wagmi';

interface Props {
	instance: LeverageMorphoInstance;
}

export default function LeverageMorphoAdjustLoan({ instance }: Props) {
	const { address } = useAccount();
	const tokenData = useTokenData(instance.loan, instance.address);
	const [direction, setDirection] = useState<boolean>(false);
	const [amount, setAmount] = useState(0n);
	const [error, setError] = useState('');

	const resultLTV =
		instance.collateralValue > 0n
			? (BigInt(instance.loanValue + (direction ? -amount : amount)) * parseEther('1')) / BigInt(instance.collateralValue)
			: 0n;
	const maxBorrowRaw = (instance.collateralValue * instance.lltv) / parseEther('1') - instance.loanValue;
	const maxBorrow = (maxBorrowRaw * parseEther('1')) / parseEther('1.001'); // give some tolerance e.g. 85.999% for 86% LLTV

	const isOwner = address != undefined && address.toLowerCase() == instance.owner.toLowerCase();

	const resultLoanStr = instance.loanValue + (direction ? -amount : amount);
	const resultLTVStr = `${formatCurrency(formatUnits(resultLTV, 18 - 2))}%`;

	const onChangeAmount = (value: string) => {
		const valueBigInt = BigInt(value);
		setAmount(valueBigInt);
	};

	useEffect(() => {
		if (!direction && amount > maxBorrow) {
			const formatedStr = formatCurrency(formatUnits(maxBorrow, instance.loanDecimals));
			setError(`You can not borrow more then ${formatedStr} ${instance.loanSymbol}.`);
		} else if (direction && amount > tokenData.balance) {
			setError(`Not enough ${instance.loanSymbol} in your wallet.`);
		} else if (!direction && !isOwner) {
			setError('You are not the owner of this position.');
		} else {
			setError('');
		}
	}, [amount, direction, instance.loanDecimals, instance.loanSymbol, isOwner, maxBorrow, tokenData.balance]);

	return (
		<div className="grid md:grid-cols-2 max-md:grid-cols-1 gap-2">
			<AppCard>
				<AppTitle title="Adjust Loan" />

				<TokenInput
					symbol={instance.loanSymbol}
					label="Current Loan"
					disabled={true}
					value={String(instance.loanValue)}
					digit={instance.loanDecimals}
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
					symbol={instance.loanSymbol}
					label={direction ? 'Repay' : 'Borrow'}
					value={String(amount)}
					digit={instance.loanDecimals}
					onChange={onChangeAmount}
					limitLabel="Balance"
					limit={tokenData.balance}
					limitDigit={instance.loanDecimals}
					reset={0n}
					max={direction ? tokenData.balance : maxBorrow}
					error={error}
				/>
			</AppCard>

			<AppCard>
				<AppTitle title="Outcome" />

				<AppBox>
					<DisplayLabel label="Result Loan" />
					<DisplayOutputAlignedRight
						className="pt-2 font-semibold"
						amount={resultLoanStr >= 0n ? resultLoanStr : 0n}
						digits={instance.loanDecimals} // shown in the loan unit
						unit={instance.loanSymbol} // shown in the loan unit
					/>
				</AppBox>

				<AppBox>
					<DisplayLabel label="Result LTV" />
					<DisplayOutputAlignedRight className="pt-2 font-semibold" output={resultLTV >= 0 ? resultLTVStr : '0'} />
				</AppBox>

				{direction ? (
					<LeverageMorphoActionRepay
						disabled={amount == 0n || error.length > 0}
						instance={instance}
						amount={amount}
						allowance={tokenData.allowance}
					/>
				) : (
					<LeverageMorphoActionBorrow disabled={amount == 0n || error.length > 0} instance={instance} amount={amount} />
				)}
			</AppCard>
		</div>
	);
}
