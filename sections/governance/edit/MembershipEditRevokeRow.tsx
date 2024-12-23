import TableRow from '@components/Table/TableRow';
import { shortenAddress, shortenHash } from '@utils';
import { Hash, zeroAddress } from 'viem';
import AppButton from '@components/AppButton';
import { useRouter as useNavigation } from 'next/navigation';
import { MembershipPermission, MembershipRoles } from '../../../hooks/useMembershipPermission';
import AddressLabel from '@components/AddressLabel';
import { TransactionLabel } from '@components/TransactionLabel';
import WalletConnectGuard from '@components/WalletConnectGuard';

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

	// @dev: show permissions
	return (
		<TableRow
			headers={headers}
			tab={tab}
			actionCol={
				<WalletConnectGuard>
					<AppButton onClick={() => navigate.push(`/governance/edit/${permission.address}`)}>Revoke</AppButton>
				</WalletConnectGuard>
			}
		>
			<TransactionLabel
				isTextRight={false}
				hash={permission.role}
				label={roleIdx < 0 ? shortenHash(permission.role as Hash) : roles[roleIdx]}
				showCopy
			/>

			<div className="">{d.split(', ')[0]}</div>

			<TransactionLabel isTextRight={true} hash={permission.txHash} label={shortenHash(permission.txHash as Hash)} showLink />
		</TableRow>
	);
}
