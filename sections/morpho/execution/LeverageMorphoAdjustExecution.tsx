import AppCard from '@components/AppCard';
import { LeverageMorphoInstance } from '../../../redux/slices/morpho.scale.types';
import AppTitle from '@components/AppTitle';
import TokenInput from '@components/Input/TokenInput';
import { useEffect, useState } from 'react';
import { useTokenData } from '../../../hooks/useTokenData';
import DisplayLabel from '@components/Display/DisplayLabel';
import DisplayOutputAlignedRight from '@components/Display/DisplayOutputAlignedRight';
import AppBox from '@components/AppBox';
import { formatCurrency } from '@utils';
import { Address, formatUnits, isAddress, parseEther, parseUnits } from 'viem';
import { useAccount } from 'wagmi';
import LeverageMorphoActionWithdrawCollateral from '../edit/LeverageMorphoActionWithdrawCollateral';
import AddressInput from '@components/Input/AddressInput';
import NormalInput from '@components/Input/NormalInput';
import LeverageMorphoAdjustPath, { UniswapPath } from './LeverageMorphoAdjustPath';
import TabsInput from '@components/Input/TabsInput';
import AppButton from '@components/AppButton';

interface Props {
	instance: LeverageMorphoInstance;
}

export default function LeverageMorphoAdjustExecution({ instance }: Props) {
	const tabsSlippage = ['1%', '2%', '5%', '10%', '20%'];
	const tabsExecution = ['Increase', 'Decrease', 'Close'];

	const loanData = useTokenData(instance.loan, instance.address);
	const collateralData = useTokenData(instance.collateral, instance.address);
	const [direction, setDirection] = useState<boolean>(false);
	const [amount, setAmount] = useState(0n);
	const [error, setError] = useState('');
	const [inputLoan, setInputLoan] = useState(0n);
	const [inputCollateral, setInputCollateral] = useState(0n);
	const [inputFlashloan, setInputFlashloan] = useState(parseUnits('1000', instance.loanDecimals));
	const [inputSlippage, setInputSlippage] = useState(tabsSlippage[0]);
	const [inputExecution, setInputExecution] = useState(tabsExecution[0]);
	const [inputTokenAddress, setInputTokenAddress] = useState('');
	const [inputPoolFee, setInputPoolFee] = useState('100');

	const [errorTokenAddress, setErrorTokenAddress] = useState('');

	const [inputPath, setInputPath] = useState<UniswapPath>({
		pools: [instance.loan],
		fees: [],
	});

	// const [inputPath, setInputPath] = useState<UniswapPath>({
	// 	pools: [
	// 		'0xB58E61C3098d85632Df34EecfB899A1Ed80921cB',
	// 		'0xdAC17F958D2ee523a2206206994597C13D831ec7',
	// 		'0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
	// 	],
	// 	fees: [100, 500],
	// });

	const resultCollateral = BigInt(instance.position.collateral) + (direction ? amount : -amount);
	const resultLTV =
		(BigInt(instance.loanValue) * parseUnits('1', 18 + instance.collateralDecimals)) / (resultCollateral * instance.price);

	const onChangeLoan = (value: string) => {
		const valueBigInt = BigInt(value);
		setInputLoan(valueBigInt);
	};
	const onChangeCollateral = (value: string) => {
		const valueBigInt = BigInt(value);
		setInputCollateral(valueBigInt);
	};
	const onChangeFlashloan = (value: string) => {
		const valueBigInt = BigInt(value);
		setInputFlashloan(valueBigInt);
	};
	const onChangeAddPool = (token: Address, fee: number) => {
		setInputPath({ pools: [...inputPath.pools, token], fees: [...inputPath.fees, fee] });
	};

	useEffect(() => {
		if (!isAddress(inputTokenAddress) && inputTokenAddress != '') {
			setErrorTokenAddress('Invalid Token Address');
		} else {
			setErrorTokenAddress('');
		}
	}, []);

	return (
		<div className="grid md:grid-cols-2 max-md:grid-cols-1 gap-2">
			<AppCard>
				<AppTitle title="Choose Execution" />

				<TabsInput className="-mt-2" tabs={tabsExecution} tab={inputExecution} setTab={setInputExecution} />

				<AppTitle title="Take Flashloan" />

				<TokenInput
					label="Flashloan Amount"
					symbol={instance.loanSymbol}
					value={inputFlashloan}
					digit={instance.loanDecimals}
					onChange={onChangeFlashloan}
					reset={parseUnits('1000', instance.loanDecimals)}
					min={parseUnits('1', instance.loanDecimals)}
				/>

				<AppTitle title="Set Uniswap" />

				<LeverageMorphoAdjustPath path={inputPath} />

				<TabsInput className="-mt-2" tabs={tabsSlippage} tab={inputSlippage} setTab={setInputSlippage} />

				<AddressInput label="Token Address" value={inputTokenAddress} onChange={setInputTokenAddress} error={errorTokenAddress} />

				<NormalInput label="Pool Fee" value={inputPoolFee} onChange={setInputPoolFee} digit={4} symbol="%" />

				<AppButton
					disabled={!isAddress(inputTokenAddress) || Number(inputPoolFee) == 0}
					onClick={() => onChangeAddPool(inputTokenAddress as Address, Number(inputPoolFee))}
				>
					Add
				</AppButton>
			</AppCard>

			<AppCard>
				<AppTitle title="Optional Funds" />

				<TokenInput
					label="Provide Loan"
					symbol={instance.loanSymbol}
					value={inputLoan}
					digit={instance.loanDecimals}
					onChange={onChangeLoan}
					max={loanData.balance}
					reset={0n}
					limit={loanData.balance}
					limitDigit={instance.loanDecimals}
					limitLabel="Balance"
				/>

				<TokenInput
					label="Provide Collateral"
					symbol={instance.collateralSymbol}
					value={inputCollateral}
					digit={instance.collateralDecimals}
					onChange={onChangeCollateral}
					max={collateralData.balance}
					reset={0n}
					limit={collateralData.balance}
					limitDigit={instance.collateralDecimals}
					limitLabel="Balance"
				/>

				<AppTitle title="Outcome" />

				<AppBox>
					<DisplayLabel label="Result Loan" />
					<DisplayOutputAlignedRight
						className="pt-2 font-semibold"
						amount={resultCollateral}
						digits={instance.loanDecimals}
						unit={instance.loanSymbol}
					/>
				</AppBox>

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

				<AppButton
					disabled={!isAddress(inputTokenAddress) || Number(inputPoolFee) == 0}
					onClick={() => onChangeAddPool(inputTokenAddress as Address, Number(inputPoolFee))}
				>
					{inputExecution}
				</AppButton>
			</AppCard>
		</div>
	);
}
