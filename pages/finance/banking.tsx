'use client';

import { DERIBIT_WS_CLIENT as deribit } from '../../app.config';
import { Currency, GetInstrumentKind, MarketGetDeliveryPricesNames } from '@wrytlabs/deribit-api-client';

export default function FinanceBankingPage() {
	return (
		<div className="grid grid-cols-4 gap-5 text-sm">
			<button
				className="bg-blue-400 p-5 rounded-2xl"
				onClick={async () => console.log(await deribit.market.getBookSummaryByCurrency({ currency: Currency.BTC }))}
			>
				getBookSummaryByCurrency
			</button>

			<button
				className="bg-blue-400 p-5 rounded-2xl"
				onClick={async () =>
					console.log(await deribit.market.getBookSummaryByInstrument({ instrument_name: 'BTC-27DEC24-100000-P' }))
				}
			>
				getBookSummaryByInstrument
			</button>

			<button className="bg-blue-400 p-5 rounded-2xl" onClick={async () => console.log(await deribit.market.getCurrencies({}))}>
				getCurrencies
			</button>

			<button
				className="bg-blue-400 p-5 rounded-2xl"
				onClick={async () =>
					console.log(await deribit.market.getDeliveryPrices({ index_name: MarketGetDeliveryPricesNames.btc_usd }))
				}
			>
				getDeliveryPrices:btc_usd
			</button>

			<button
				className="bg-blue-400 p-5 rounded-2xl"
				onClick={async () => {
					const position = await deribit.account.getPosition({ instrument_name: 'BTC-27DEC24-110000-C' });
					if ('result' in position) {
						if (position.result.kind === GetInstrumentKind.option) {
							console.log(position.result);
						}
					}
				}}
			>
				getPosition
			</button>

			<button
				className="bg-blue-400 p-5 rounded-2xl"
				onClick={async () => {
					const response = await deribit.wallet.getDeposits({
						currency: Currency.USDT,
					});
					if ('result' in response) {
						console.log(response.result);
					}
				}}
			>
				getTransfers
			</button>
		</div>
	);
}
