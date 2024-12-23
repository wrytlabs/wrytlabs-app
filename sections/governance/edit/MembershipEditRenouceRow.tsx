import TableRow from '@components/Table/TableRow';
import { shortenAddress, shortenHash } from '@utils';
import { Hash, zeroAddress } from 'viem';
import { useRouter as useNavigation } from 'next/navigation';
import { MembershipPermission, MembershipRoles } from '../../../hooks/useMembershipPermission';
import { TransactionLabel } from '@components/TransactionLabel';
import MembershipEditRenouceAction from './MembershipEditRenouceAction';

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
	const role = roleIdx < 0 ? shortenHash(permission.role as Hash) : roles[roleIdx];

	// @dev: show permissions
	return (
		<TableRow
			headers={headers}
			tab={tab}
			actionCol={<MembershipEditRenouceAction membership={permission.address} roleHex={rolesHex[roleIdx]} role={role} />}
		>
			<TransactionLabel isTextRight={false} hash={permission.role} label={role} showCopy />

			<div className="">{d.split(', ')[0]}</div>

			<TransactionLabel isTextRight={true} hash={permission.txHash} label={shortenHash(permission.txHash as Hash)} showLink />
		</TableRow>
	);
}
