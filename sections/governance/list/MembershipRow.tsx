import TableRow from '@components/Table/TableRow';
import { MembershipFactory } from '../../../hooks/useMembershipFactory';
import { shortenAddress, shortenHash } from '@utils';
import { Hash, zeroAddress } from 'viem';
import AppButton from '@components/AppButton';
import { useRouter as useNavigation } from 'next/navigation';

interface Props {
	headers: string[];
	tab: string;
	membership: MembershipFactory;
}

export default function MembershipRow({ headers, tab, membership }: Props) {
	const navigate = useNavigation();
	const d = new Date(membership.createdAt * 1000).toLocaleString();

	//
	if (membership.address === zeroAddress) {
		return (
			<TableRow
				headers={headers}
				tab={tab}
				actionCol={<AppButton onClick={() => navigate.push('/governance/create')}>Create</AppButton>}
			>
				{[
					<div key="create" className="text-left text-text-secondary">
						Create a membership contract to manage roles and permissions
					</div>,
				]}
			</TableRow>
		);
	}

	return (
		<TableRow headers={headers} tab={tab} actionCol={<AppButton>Edit</AppButton>}>
			<div className="text-left">{d.split(', ')[0]}</div>

			<div>{shortenAddress(membership.address)}</div>
			<div>{shortenAddress(membership.creator)}</div>
			<div>{shortenHash(membership.txHash as Hash)}</div>
		</TableRow>
	);
}
