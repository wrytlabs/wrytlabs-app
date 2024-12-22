import { TransactionLabel } from '@components/TransactionLabel';
import TokenLogo from '@components/TokenLogo';
import TableRow from '@components/Table/TableRow';
import { MembershipFactory } from '../../../hooks/useMembershipFactory';
import { shortenAddress, shortenHash } from '@utils';
import { Hash } from 'viem';
import AppButton from '@components/AppButton';

interface Props {
	headers: string[];
	tab: string;
	membership: MembershipFactory;
}

export default function MembershipRow({ headers, tab, membership }: Props) {
	const d = new Date(membership.createdAt * 1000).toLocaleString();

	return (
		<TableRow headers={headers} tab={tab} actionCol={<AppButton>Edit</AppButton>}>
			<div className="text-left">{d.split(', ')[0]}</div>

			<div>{shortenAddress(membership.address)}</div>
			<div>{shortenAddress(membership.creator)}</div>
			<div>{shortenHash(membership.txHash as Hash)}</div>
		</TableRow>
	);
}
