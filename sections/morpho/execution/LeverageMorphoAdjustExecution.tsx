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
import AddressInput from '@components/Input/AddressInput';
import NormalInput from '@components/Input/NormalInput';
import LeverageMorphoAdjustPath, { UniswapPath } from './LeverageMorphoAdjustPath';
import TabsInput from '@components/Input/TabsInput';
import AppButton from '@components/AppButton';
import LeverageMorphoActionIncrease from './LeverageMorphoActionIncrease';
import LeverageMorphoActionDecrease from './LeverageMorphoActionDecrease';
import LeverageMorphoActionClose from './LeverageMorphoActionClose';

interface Props {
	instance: LeverageMorphoInstance;
}

export default function LeverageMorphoAdjustExecution({ instance }: Props) {
	const tabsSlippage = ['0.2%', '0.5%', '1%', '3%', '5%'];
	const tabsExecution = ['Increase', 'Decrease', 'Close'];

	const loanData = useTokenData(instance.loan, instance.address);
	const collateralData = useTokenData(instance.collateral, instance.address);
	const [direction, setDirection] = useState<boolean>(false);
	const [amount, setAmount] = useState(0n);
	const [error, setError] = useState('');
	const [isValidPath, setIsValidPath] = useState(false);
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
		resultCollateral > 0n
			? (instance.loanValue * parseUnits('1', 18 + instance.collateralDecimals)) / (resultCollateral * instance.price)
			: 0n;

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
	const onChangeRemovePool = () => {
		setInputPath({ pools: [...inputPath.pools.slice(0, -1)], fees: [...inputPath.fees.slice(0, -1)] });
	};

	useEffect(() => {
		if (!isAddress(inputTokenAddress) && inputTokenAddress != '') {
			setErrorTokenAddress('Invalid Token Address');
		} else {
			setErrorTokenAddress('');
		}
	}, []);

	useEffect(() => {
		if (inputExecution == 'Close') {
			setInputFlashloan(0n);
			setInputLoan(0n);
			setInputCollateral(0n);
		}
	}, [inputExecution]);

	useEffect(() => {
		const p = inputPath.pools;
		const p0 = p.at(0);
		const p1 = p.at(-1);

		if (p.length < 2 || p0 == undefined || p1 == undefined) {
			setIsValidPath(false);
		} else if (p0.toLowerCase() == instance.loan.toLowerCase() && p1.toLowerCase() == instance.collateral.toLowerCase()) {
			setIsValidPath(true);
		} else {
			setIsValidPath(false);
		}
	}, [inputPath]);

	return (
		<div className="grid md:grid-cols-2 max-md:grid-cols-1 gap-2">
			<AppCard>
				<AppTitle title="Choose Execution" />

				<TabsInput className="-mt-2" tabs={tabsExecution} tab={inputExecution} setTab={setInputExecution} />

				<AppTitle title="Take Flashloan" />

				<TokenInput
					label="Flashloan Amount"
					symbol={inputExecution == 'Increase' ? instance.loanSymbol : instance.collateralSymbol}
					value={inputFlashloan}
					digit={inputExecution == 'Increase' ? instance.loanDecimals : instance.collateralDecimals}
					onChange={onChangeFlashloan}
					min={parseUnits('1', inputExecution == 'Increase' ? instance.loanDecimals : instance.collateralDecimals)}
					disabled={inputExecution == 'Close'}
				/>

				<AppTitle title="Set Uniswap" />

				<LeverageMorphoAdjustPath instance={instance} path={inputPath} />

				<TabsInput className="-mt-2" tabs={tabsSlippage} tab={inputSlippage} setTab={setInputSlippage} />

				<AddressInput
					label="Token Address"
					value={inputTokenAddress}
					onChange={setInputTokenAddress}
					error={errorTokenAddress}
					disabled={isValidPath}
				/>

				<NormalInput label="Pool Fee" value={inputPoolFee} onChange={setInputPoolFee} digit={4} symbol="%" disabled={isValidPath} />

				<div className="grid md:grid-cols-2 gap-4">
					<AppButton
						className={inputPath.pools.length > 1 ? 'bg-red-500' : ''}
						disabled={inputPath.pools.length < 2}
						onClick={onChangeRemovePool}
					>
						Remove
					</AppButton>

					<AppButton
						disabled={!isAddress(inputTokenAddress) || Number(inputPoolFee) == 0 || isValidPath}
						onClick={() => onChangeAddPool(inputTokenAddress as Address, Number(inputPoolFee))}
					>
						Add
					</AppButton>
				</div>
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
					disabled={inputExecution == 'Close'}
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
					disabled={inputExecution == 'Close'}
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

				{inputExecution == 'Increase' && (
					<LeverageMorphoActionIncrease
						instance={instance}
						inputLoan={inputLoan}
						inputCollateral={inputCollateral}
						flash={inputFlashloan}
						path={inputPath}
						slippage={Number(inputSlippage.slice(0, -1))}
						allowanceLoan={loanData.allowance}
						allowanceCollateral={collateralData.allowance}
					/>
				)}

				{inputExecution == 'Decrease' && (
					<LeverageMorphoActionDecrease
						instance={instance}
						inputLoan={inputLoan}
						inputCollateral={inputCollateral}
						flash={inputFlashloan}
						path={inputPath}
						slippage={Number(inputSlippage.slice(0, -1))}
						allowanceLoan={loanData.allowance}
						allowanceCollateral={collateralData.allowance}
					/>
				)}

				{inputExecution == 'Close' && (
					<LeverageMorphoActionClose instance={instance} path={inputPath} slippage={Number(inputSlippage.slice(0, -1))} />
				)}
			</AppCard>
		</div>
	);
}
