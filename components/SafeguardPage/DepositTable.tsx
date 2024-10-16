import { useState } from 'react';
import Table from '../Table';
import TableHeader from '../Table/TableHead';
import TableBody from '../Table/TableBody';
import TableRowEmpty from '../Table/TableRowEmpty';
import { ResponseDepositUSDT } from '../../mock/ResponseDeposit';
import SafeguardDepositRow from './DepositRow';

export default function SafeguardDepositTable() {
	const headers: string[] = ['Collateral', 'Amount', 'Value', 'Date', 'Tx'];
	const [tab, setTab] = useState<string>(headers[3]);
	const [reverse, setReverse] = useState<boolean>(false);

	const handleTabOnChange = function (e: string) {
		if (tab === e) {
			setReverse(!reverse);
		} else {
			setReverse(false);
			setTab(e);
		}
	};

	const sorted = ResponseDepositUSDT.result.data;

	return (
		<Table>
			<TableHeader headers={headers} tab={tab} reverse={reverse} tabOnChange={handleTabOnChange} />
			<TableBody>
				{sorted.length == 0 ? (
					<TableRowEmpty>{'There are no deposits yet.'}</TableRowEmpty>
				) : (
					sorted.map((d) => <SafeguardDepositRow key={d.transaction_id} headers={headers} deposit={d} />)
				)}
			</TableBody>
		</Table>
	);
}
