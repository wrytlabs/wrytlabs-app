import { useEffect, useState } from 'react';
import { useMembershipFactory } from '../../../hooks/useMembershipFactory';
import Table from '@components/Table';
import TableHeader from '@components/Table/TableHead';
import TableRowEmpty from '@components/Table/TableRowEmpty';
import TableBody from '@components/Table/TableBody';
import MembershipRow from './MembershipRow';

export default function MembershipTable() {
	const headers: string[] = ['Date', 'Contract', 'Creator', 'Tx'];
	const [tab, setTab] = useState<string>(headers[3]);
	const [reverse, setReverse] = useState<boolean>(false);
	const { loading, membershipFactory } = useMembershipFactory();

	const handleTabOnChange = function (e: string) {
		if (tab === e) {
			setReverse(!reverse);
		} else {
			setReverse(false);
			setTab(e);
		}
	};

	return (
		<Table>
			<TableHeader headers={headers} tab={tab} reverse={reverse} tabOnChange={handleTabOnChange} actionCol />
			<TableBody>
				{loading ? (
					<TableRowEmpty>{'There are no deposits yet.'}</TableRowEmpty>
				) : membershipFactory.length == 0 ? (
					<TableRowEmpty>{'There are no deposits yet.'}</TableRowEmpty>
				) : (
					membershipFactory.map((m) => <MembershipRow key={m.address} headers={headers} tab={tab} membership={m} />)
				)}
			</TableBody>
		</Table>
	);
}
