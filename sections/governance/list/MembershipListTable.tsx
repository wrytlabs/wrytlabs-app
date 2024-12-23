import { useState } from 'react';
import Table from '@components/Table';
import TableHeader from '@components/Table/TableHead';
import TableRowEmpty from '@components/Table/TableRowEmpty';
import TableBody from '@components/Table/TableBody';
import MembershipListRow from './MembershipListRow';
import { Address, zeroAddress } from 'viem';
import { MembershipPermission, useMembershipPermissionAccount } from '../../../hooks/useMembershipPermission';
import { useAccount } from 'wagmi';

export default function MembershipListTable() {
	const headers: string[] = ['Membership', 'Roles Count', 'Latest Date', 'Latest Tx'];
	const [tab, setTab] = useState<string>(headers[3]);
	const [reverse, setReverse] = useState<boolean>(false);

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

	const uniqueContracts = new Map<Address, number>();
	const filteredList: MembershipPermission[] = membershipPermissionAccount.filter((p) => {
		if (!p.permission) return false;

		const addr = p.address as Address;
		const num = uniqueContracts.get(addr);
		if (num === undefined) {
			uniqueContracts.set(addr, 1);
			return true;
		} else {
			uniqueContracts.set(addr, num + 1);
			return false;
		}
	});

	const createMembership: MembershipPermission = {
		address: zeroAddress,
		createdAt: 0,
		updatedAt: 0,
		txHash: '',
		role: '',
		account: zeroAddress,
		permission: false,
	};

	const sortedList: MembershipPermission[] = [createMembership, ...filteredList];

	return (
		<Table>
			<TableHeader headers={headers} tab={tab} reverse={reverse} tabOnChange={handleTabOnChange} actionCol />
			<TableBody>
				{loadingPermission ? (
					<TableRowEmpty>{'Still loading, hang on...'}</TableRowEmpty>
				) : sortedList.length == 0 ? (
					<TableRowEmpty>{'There are no roles or permissions yet.'}</TableRowEmpty>
				) : (
					sortedList.map((p) => (
						<MembershipListRow key={p.address} headers={headers} tab={tab} permission={p} counter={uniqueContracts} />
					))
				)}
			</TableBody>
		</Table>
	);
}
