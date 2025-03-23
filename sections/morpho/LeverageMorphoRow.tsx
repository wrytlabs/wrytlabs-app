import TableRow from '@components/Table/TableRow';
import { LeverageMorphoFactory } from '../../hooks/morpho/useLeverageMorphoList';
import { CONTRACT, shortenAddress, MorphoABI, formatCurrency, MorphoChainlinkOracleV2ABI } from '@utils';
import { useEffect, useState } from 'react';
import { WAGMI_CONFIG } from '../../app.config';
import { readContract } from 'wagmi/actions';
import { formatUnits, Hash, parseUnits } from 'viem';
import AppBox from '@components/AppBox';
import AppButton from '@components/AppButton';
import Link from 'next/link';
import CollateralTableItem from '@components/Display/CollateralTableItem';

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
			<TableRow
				headers={headers}
				tab={tab}
				actionCol={
					<Link href={`/morpho/scale/details/${instance.address.toLowerCase()}`}>
						<AppButton>Details</AppButton>
					</Link>
				}
			>
				<div className="flex flex-col max-md:mb-5">
					<AppBox className="md:hidden">
						<CollateralTableItem
							symbol={instance.collateralSymbol}
							name={instance.collateralName}
							address={instance.collateral}
						/>
					</AppBox>
					<div className="max-md:hidden">
						<CollateralTableItem
							symbol={instance.collateralSymbol}
							name={instance.collateralName}
							address={instance.collateral}
						/>
					</div>
				</div>

				<div className="flex flex-col">
					{formatCurrency(formatUnits(equity, instance.loanDecimals))} {instance.loanSymbol}
				</div>

				<div className="flex flex-col">{`${formatCurrency(formatUnits(ltv, 18 - 2))}% / ${lltv}%`}</div>

				<div className="flex flex-col">
					{equity > 0 ? formatCurrency(formatUnits((loanBalance * parseUnits('1', 18)) / equity, 18)) : '0'}x{' '}
				</div>
			</TableRow>
		</>
	);
}
