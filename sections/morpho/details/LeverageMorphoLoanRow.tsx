import TableRow from '@components/Table/TableRow';
import { formatUnits, parseUnits } from 'viem';
import AppBox from '@components/AppBox';
import AppButton from '@components/AppButton';
import Link from 'next/link';
import TokenNameTableItem from '@components/Display/TokenNameTableItem';
import { LeverageMorphoInstance, LeverageMorphoLoanFlatRaw } from '../../../redux/slices/morpho.scale.types';
import { formatCurrency } from '@utils';
import TokenAmountTableItem from '@components/Display/TokenAmountTableItem';
import AppLink from '@components/AppLink';
import { useContractUrl, useTxUrl } from '../../../hooks/useContractUrl';

interface Props {
	headers: string[];
	tab: string;
	instance: LeverageMorphoInstance;
	entry: LeverageMorphoLoanFlatRaw;
}

export default function LeverageMorphoLoanRow({ headers, tab, instance, entry }: Props) {
	const link = useTxUrl(entry.txHash);

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
						<TokenNameTableItem symbol={instance.loanSymbol} name={instance.loanName} address={instance.loan} />
					</AppBox>
					<div className="max-md:hidden">
						<TokenNameTableItem symbol={instance.loanSymbol} name={instance.loanName} address={instance.loan} />
					</div>
				</div>

				<div className="flex flex-col">
					{formatCurrency(formatUnits(entry.amount, instance.loanDecimals))} {instance.loanSymbol}
				</div>

				<div className="flex flex-col">{entry.direction ? 'Repaid' : 'Borrowed'}</div>

				<div className="flex flex-col">
					<AppLink label={new Date(entry.createdAt * 1000).toDateString()} href={link} external={true} />
				</div>
			</TableRow>
		</>
	);
}
