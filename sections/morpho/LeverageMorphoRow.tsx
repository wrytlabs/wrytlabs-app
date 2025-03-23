import TableRow from '@components/Table/TableRow';
import { LeverageMorphoFactory } from '../../hooks/morpho/useLeverageMorphoList';
import { CONTRACT, shortenAddress, MorphoABI, formatCurrency, MorphoChainlinkOracleV2ABI } from '@utils';
import { useEffect, useState } from 'react';
import { WAGMI_CONFIG } from '../../app.config';
import { readContract } from 'wagmi/actions';
import { formatUnits, Hash, parseUnits } from 'viem';
import TokenLogo from '@components/TokenLogo';
import AppBox from '@components/AppBox';

interface Props {
	headers: string[];
	tab: string;
	instance: LeverageMorphoFactory;
}

export interface Market {
	totalSupplyAssets: bigint;
	totalSupplyShares: bigint;
	totalBorrowAssets: bigint;
	totalBorrowShares: bigint;
	lastUpdate: bigint;
	fee: bigint;
}

export interface Position {
	supplyShares: bigint;
	borrowShares: bigint;
	collateral: bigint;
}

const defaultMarket: Market = {
	totalSupplyAssets: 0n,
	totalSupplyShares: 0n,
	totalBorrowAssets: 0n,
	totalBorrowShares: 0n,
	lastUpdate: 0n,
	fee: 0n,
};

const defaultPosition: Position = {
	supplyShares: 0n,
	borrowShares: 0n,
	collateral: 0n,
};

export default function LeverageMorphoRow({ headers, tab, instance }: Props) {
	const [loanBalance, setLoanBalance] = useState<bigint>(0n);
	const [collateralBalance, setCollateralBalance] = useState<bigint>(0n);
	const [position, setPosition] = useState<Position>(defaultPosition);
	const [market, setMarket] = useState<Market>(defaultMarket);
	const [oracle, setOracle] = useState<bigint>(0n);

	useEffect(() => {
		const fetcher = async () => {
			const position = await readContract(WAGMI_CONFIG, {
				address: CONTRACT.Morpho,
				abi: MorphoABI,
				functionName: 'position',
				args: [instance.marketId as Hash, instance.address],
			});

			setPosition({
				supplyShares: position[0],
				borrowShares: position[1],
				collateral: position[2],
			});

			setCollateralBalance(position[2]);

			const market = await readContract(WAGMI_CONFIG, {
				address: CONTRACT.Morpho,
				abi: MorphoABI,
				functionName: 'market',
				args: [instance.marketId as Hash],
			});

			setMarket({
				totalSupplyAssets: market[0],
				totalSupplyShares: market[1],
				totalBorrowAssets: market[2],
				totalBorrowShares: market[3],
				lastUpdate: market[4],
				fee: market[5],
			});

			const oraclePrice = await readContract(WAGMI_CONFIG, {
				address: instance.oracle,
				abi: MorphoChainlinkOracleV2ABI,
				functionName: 'price',
			});

			const oracleScale = await readContract(WAGMI_CONFIG, {
				address: instance.oracle,
				abi: MorphoChainlinkOracleV2ABI,
				functionName: 'SCALE_FACTOR',
			});

			setOracle((oraclePrice * parseUnits('1', 10)) / oracleScale);

			setLoanBalance((position[1] * market[2]) / market[3]);
		};

		fetcher();
	}, [instance]);

	const equityValue = (collateralBalance * oracle) / parseUnits('1', instance.collateralDecimals);
	const equity = equityValue - loanBalance;

	const lltv = Math.round(parseFloat(formatUnits(instance.lltv, 18 - 2)));
	const ltv = equity > 0 ? (equity * parseUnits('1', 18)) / loanBalance : 0n;

	return (
		<>
			<TableRow headers={headers} tab={tab} actionCol={<div className="text-right">Action</div>}>
				{/* Collateral */}
				<div className="flex flex-col max-md:mb-5">
					{/* desktop view */}
					<div className="max-md:hidden flex flex-row items-center -ml-12">
						<span className="mr-4 cursor-pointer">
							<TokenLogo currency={instance.collateralSymbol} />
						</span>
						<span className={`col-span-2 text-md text-text-primary`}>{instance.collateralSymbol} </span>
					</div>

					{/* mobile view */}
					<AppBox className="md:hidden flex flex-row items-center">
						<div className="mr-4 cursor-pointer">
							<TokenLogo currency={instance.collateralSymbol} />
						</div>
						<div className={`col-span-2 text-md ${headers[0] === tab ? 'text-text-primary' : ''} font-semibold`}>
							{instance.collateralSymbol}{' '}
						</div>
					</AppBox>
				</div>

				<div className="flex flex-col">
					{formatCurrency(formatUnits(equity, instance.loanDecimals))} {instance.loanSymbol}
				</div>

				<div className="flex flex-col">{`${formatCurrency(formatUnits(ltv, 18 - 2))}% / ${lltv}%`}</div>

				<div className="flex flex-col">
					{equity > 0 ? formatCurrency(formatUnits((loanBalance * parseUnits('1', 18)) / equity, 18)) : '-'}x{' '}
				</div>
			</TableRow>
		</>
	);
}
