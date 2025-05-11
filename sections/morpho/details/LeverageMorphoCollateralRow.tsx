import TableRow from '@components/Table/TableRow';
import { formatUnits } from 'viem';
import AppBox from '@components/AppBox';
import TokenNameTableItem from '@components/Display/TokenNameTableItem';
import { LeverageMorphoCollateralFlatRaw, LeverageMorphoInstance } from '../../../redux/slices/morpho.scale.types';
import { formatCurrency } from '@utils';
import AppLink from '@components/AppLink';
import { useTxUrl } from '../../../hooks/useContractUrl';

interface Props {
	headers: string[];
	tab: string;
	instance: LeverageMorphoInstance;
	entry: LeverageMorphoCollateralFlatRaw;
}

export default function LeverageMorphoCollateralRow({ headers, tab, instance, entry }: Props) {
	const link = useTxUrl(entry.txHash);

	return (
		<>
			<TableRow headers={headers} tab={tab} rawHeader={true}>
				<AppLink className="md:text-left" label={new Date(entry.createdAt * 1000).toDateString()} href={link} external={true} />

				<div className="flex flex-col">{entry.direction ? 'Withdrawn' : 'Deposit'}</div>

				<div className="flex flex-col">
					{formatCurrency(formatUnits(entry.oracle, instance.loanDecimals))} {instance.loanSymbol}
				</div>

				<div className="flex flex-col">
					{formatCurrency(
						formatUnits(BigInt(entry.oracle) * BigInt(entry.amount), instance.loanDecimals + instance.collateralDecimals)
					)}{' '}
					{instance.loanSymbol}
				</div>

				<div className="flex flex-col">
					{formatCurrency(formatUnits(entry.amount, instance.collateralDecimals))} {instance.collateralSymbol}
				</div>
			</TableRow>
		</>
	);
}
