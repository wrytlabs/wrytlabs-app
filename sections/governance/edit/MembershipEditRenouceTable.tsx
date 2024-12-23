import { useState } from 'react';
import Table from '@components/Table';
import TableHeader from '@components/Table/TableHead';
import TableRowEmpty from '@components/Table/TableRowEmpty';
import TableBody from '@components/Table/TableBody';
import MembershipEditRow from './MembershipEditRenouceRow';
import { Address, zeroAddress } from 'viem';
import { MembershipPermission, useMembershipPermissionAccount } from '../../../hooks/useMembershipPermission';
import { useAccount } from 'wagmi';
import { useRouter as useNavigation } from 'next/navigation';

interface Props {
	membership: Address;
}

export default function MembershipEditTable({ membership }: Props) {
	const headers: string[] = ['Role', 'Date', 'Tx'];
	const [tab, setTab] = useState<string>(headers[0]);
	const [reverse, setReverse] = useState<boolean>(false);

	const navigate = useNavigation();
	const { address } = useAccount();
	const { loading: loadingPermission, membershipPermissionAccount } = useMembershipPermissionAccount(address ?? zeroAddress);

	const handleTabOnChange = function (e: string) {
		if (tab === e) {
			setReverse(!reverse);
		} else {
			setReverse(false);
			setTab(e);
		}
	};

	const filteredList: MembershipPermission[] = membershipPermissionAccount.filter((p) => {
		if (membership == zeroAddress) navigate.replace(p.address);
		return p.permission && p.address == membership;
	});

	const sortedList: MembershipPermission[] = sortPermission({ permission: filteredList, headers, reverse, tab });

	return (
		<Table>
			<TableHeader headers={headers} tab={tab} reverse={reverse} tabOnChange={handleTabOnChange} actionCol />
			<TableBody>
				{loadingPermission ? (
					<TableRowEmpty>{'Still loading, hang on...'}</TableRowEmpty>
				) : sortedList.length == 0 ? (
					<TableRowEmpty>{'There are no roles or permissions yet.'}</TableRowEmpty>
				) : (
					sortedList.map((p) => <MembershipEditRow key={p.address} headers={headers} tab={tab} permission={p} />)
				)}
			</TableBody>
		</Table>
	);
}

type SortPermission = {
	permission: MembershipPermission[];
	headers: string[];
	tab: string;
	reverse: boolean;
};

function sortPermission(params: SortPermission): MembershipPermission[] {
	const { permission, headers, tab, reverse } = params;

	if (tab === headers[0]) {
		permission.sort((a, b) => a.role.localeCompare(b.role));
	} else if (tab === headers[1]) {
		permission.sort((a, b) => b.updatedAt - a.updatedAt);
	} else if (tab === headers[2]) {
		permission.sort((a, b) => a.txHash.localeCompare(b.txHash));
	}

	return reverse ? permission.reverse() : permission;
}
