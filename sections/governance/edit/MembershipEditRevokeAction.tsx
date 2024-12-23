import TableRow from '@components/Table/TableRow';
import { shortenAddress, shortenHash } from '@utils';
import { Hash, zeroAddress } from 'viem';
import AppButton from '@components/AppButton';
import { useRouter as useNavigation } from 'next/navigation';
import { MembershipPermission, MembershipRoles } from '../../../hooks/useMembershipPermission';
import AddressLabel from '@components/AddressLabel';
import { TransactionLabel } from '@components/TransactionLabel';

interface Props {
	headers: string[];
	tab: string;
	permission: MembershipPermission;
}

export default function MembershipEditRow({ headers, tab, permission }: Props) {
	const navigate = useNavigation();
	const d = new Date(permission.createdAt * 1000).toLocaleString();
	const roles = Object.keys(MembershipRoles);
	const rolesHex = Object.values(MembershipRoles);
	const roleIdx = rolesHex.findIndex((r) => r == permission.role);

	// @dev: create new membership
	if (permission.address === zeroAddress) {
		return (
			<TableRow
				headers={headers}
				tab={tab}
				actionCol={<AppButton onClick={() => navigate.push('/governance/create')}>Create</AppButton>}
			>
				{[
					<div key="create" className="text-left text-text-secondary">
						Create a permission contract to manage roles and permissions
					</div>,
				]}
			</TableRow>
		);
	}

	// @dev: show permissions
	return (
		<TableRow
			headers={headers}
			tab={tab}
			actionCol={<AppButton onClick={() => navigate.push(`/governance/edit/${permission.address}`)}>Edit</AppButton>}
		>
			<div className="text-left">{d.split(', ')[0]}</div>

			<AddressLabel address={permission.address} label={shortenAddress(permission.address)} showLink />

			{roleIdx >= 0 ? <div>{roles[roleIdx]}</div> : <div>{roles[roleIdx]}</div>}

			<TransactionLabel hash={permission.txHash} label={shortenHash(permission.txHash as Hash)} showLink />
		</TableRow>
	);
}
