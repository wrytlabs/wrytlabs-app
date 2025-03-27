import TableRow from '@components/Table/TableRow';
import { formatUnits, parseUnits } from 'viem';
import AppBox from '@components/AppBox';
import AppButton from '@components/AppButton';
import Link from 'next/link';
import TokenNameTableItem from '@components/Display/TokenNameTableItem';
import { LeverageMorphoInstance } from '../../redux/slices/morpho.scale.types';
import { formatCurrency } from '@utils';

interface Props {
	headers: string[];
	tab: string;
	instance: LeverageMorphoInstance;
}

export default function LeverageMorphoRow({ headers, tab, instance }: Props) {
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
					<AppBox className="md:hidden grid gap-2">
						<TokenNameTableItem
							symbol={instance.collateralSymbol}
							name={instance.collateralName}
							address={instance.collateral}
						/>
					</AppBox>
					<div className="max-md:hidden">
						<TokenNameTableItem
							symbol={instance.collateralSymbol}
							name={instance.collateralName}
							address={instance.collateral}
						/>
					</div>
				</div>

				<div className="flex flex-col">
					{formatCurrency(formatUnits(instance.equityValue, instance.loanDecimals))} {instance.loanSymbol}
				</div>

				<div className="flex flex-col">{`${formatCurrency(formatUnits(instance.ltv, 18 - 2))}% / ${formatUnits(
					instance.lltv,
					18 - 2
				)}%`}</div>

				<div className="flex flex-col">
					{instance.equityValue > 0
						? formatCurrency(formatUnits((instance.loanValue * parseUnits('1', 18)) / instance.equityValue, 18))
						: '0'}
					x{' '}
				</div>
			</TableRow>
		</>
	);
}
