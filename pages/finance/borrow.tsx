import { useState } from 'react';
import { DERIBIT_WS_CLIENT as deribit } from '../../app.config';
import { Currency } from '@wrytlabs/deribit-api-client';

export default function FinanceBorrowPage() {
	const [tx, setTx] = useState<[]>([]);

	const handleApiTransferResult = () => {
		deribit.wallet
			.getTransfers(
				{
					currency: Currency.BTC,
				},
				(d) => {
					console.log(d);
					return d.testnet;
				}
			)
			.then((data) => {
				console.log(data);
			})
			.catch(console.log);
	};

	return (
		<div>
			<h1>RPC Example</h1>
			<button onClick={handleApiTransferResult}>Send Message</button>

			{tx.map((t, idx) => (
				<div key={`tx-${idx}`}>{JSON.stringify(t)}</div>
			))}
		</div>
	);
}
