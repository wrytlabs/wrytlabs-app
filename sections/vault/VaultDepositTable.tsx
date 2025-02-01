import { useEffect, useState } from 'react';
import Table from '@components/Table';
import TableHeader from '@components/Table/TableHead';
import TableBody from '@components/Table/TableBody';
import TableRowEmpty from '@components/Table/TableRowEmpty';
import { DERIBIT_WS_CLIENT as deribit } from '../../app.config';
import { Currency, WalletGetDepositsItem } from '@wrytlabs/deribit-api-client';
import { VaultDepositRow } from './VaultDepositRow';

export function VaultDepositTable() {
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
					deposits.map((d) => <VaultDepositRow headers={headers} tab={tab} deposit={d} key={d.transaction_id} />)
				)}
			</TableBody>
		</Table>
	);
}
