import { useState } from 'react';
import { DERIBIT_WS_CLIENT } from '../../app.config';

type ApiTransferResult = {
	count: number;
	data: ApiTransferResultItem[];
};

type ApiTransferResultItem = {
	amount: number;
	created_timestamp: number;
	currency: string;
	direction: string;
	id: number;
	other_side: string;
	state: string;
	type: string;
	updated_timestamp: number;
};

export default function FinanceBankingPage() {
	const [tx, setTx] = useState<ApiTransferResultItem[]>([]);

	const handleApiTransferResult = () => {
		DERIBIT_WS_CLIENT.send<ApiTransferResult>(
			'/private/get_transfers',
			{
				currency: 'BTC',
				count: 10,
			},
			(data) => {
				if (data?.result?.data) {
					setTx(data.result.data);
				}
			}
		);
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
