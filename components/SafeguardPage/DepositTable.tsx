import { useEffect, useState } from 'react';
import Table from '../Table';
import TableHeader from '../Table/TableHead';
import TableBody from '../Table/TableBody';
import TableRowEmpty from '../Table/TableRowEmpty';
import SafeguardDepositRow from './DepositRow';
import { DERIBIT_WS_CLIENT as deribit } from '../../app.config';
import { Currency, WalletGetDepositsItem } from '@wrytlabs/deribit-api-client';

export default function SafeguardDepositTable() {
	const headers: string[] = ['Collateral', 'Amount', 'Value', 'Date', 'Tx'];
	const [tab, setTab] = useState<string>(headers[3]);
	const [reverse, setReverse] = useState<boolean>(false);
	const [deposits, setDeposits] = useState<WalletGetDepositsItem[]>([]);

	const handleTabOnChange = function (e: string) {
		if (tab === e) {
			setReverse(!reverse);
		} else {
			setReverse(false);
			setTab(e);
		}
	};

	useEffect(() => {
		const fetch = async () => {
			const _deposits = await deribit.wallet.getDeposits({
				currency: Currency.USDT,
			});
			if ('result' in _deposits) setDeposits(_deposits.result.data);
		};

		fetch();
	}, []);

	return (
		<Table>
			<TableHeader headers={headers} tab={tab} reverse={reverse} tabOnChange={handleTabOnChange} />
			<TableBody>
				{deposits.length == 0 ? (
					<TableRowEmpty>{'There are no deposits yet.'}</TableRowEmpty>
				) : (
					deposits.map((d) => <SafeguardDepositRow headers={headers} tab={tab} deposit={d} key={d.transaction_id} />)
				)}
			</TableBody>
		</Table>
	);
}
