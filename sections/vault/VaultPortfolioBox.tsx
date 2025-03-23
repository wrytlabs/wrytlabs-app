import AppBox from '@components/AppBox';
import { formatCurrency, FormatType } from '@utils';
import TokenLogo from '@components/TokenLogo';
import { ResponseGetIndexBTC, ResponseGetIndexETH } from '../../mock/ResponseGetIndex';

export interface Props {
	currency: string;
	amount?: number;
	deposit?: number;
	withdrawal?: number;
	sent?: number;
	received?: number;
}

export function VaultPortfolioBox({ currency, amount, deposit, withdrawal, sent, received }: Props) {
	const prices: { [key: string]: number } = {
		BTC: ResponseGetIndexBTC.result.BTC,
		ETH: ResponseGetIndexETH.result.ETH,
		USDC: 1,
		USDT: 1,
	};

	const value: number = (amount ?? 0) * prices[currency.toUpperCase()];

	return (
		<div>
			<AppBox>
				<div className="flex flex-row gap-2">
					<div className="flex items-center">
						<TokenLogo currency={currency} />
					</div>

					<div className="flex-1 font-semibold">
						<div className="flex justify-end">{formatCurrency(amount ?? 0, 2, 2, FormatType.us)}</div>
						<div className="flex justify-end">{formatCurrency(value ?? 0, 2, 2, FormatType.us)}</div>
					</div>

					<div className="flex flex-col w-12">
						<div className="flex">{currency.toUpperCase()}</div>
						<div className="flex">USD</div>
					</div>
				</div>
			</AppBox>

			<div className="flex flex-row gap-2 my-4 px-6">
				<div className="flex flex-col">
					<div className="flex justify-start">Deposit</div>
					<div className="flex justify-start">Withdrawal</div>
					<div className="flex justify-start">Sent</div>
					<div className="flex justify-start">Received</div>
				</div>

				<div className="flex-1">
					<div className="flex justify-end">{formatCurrency(deposit ?? 0, 2, 2, FormatType.us)}</div>
					<div className="flex justify-end">{formatCurrency(withdrawal ?? 0, 2, 2, FormatType.us)}</div>
					<div className="flex justify-end">{formatCurrency(sent ?? 0, 2, 2, FormatType.us)}</div>
					<div className="flex justify-end">{formatCurrency(received ?? 0, 2, 2, FormatType.us)}</div>
				</div>

				<div className="flex flex-col w-12">
					<div className="flex">{currency.toUpperCase()}</div>
					<div className="flex">{currency.toUpperCase()}</div>
					<div className="flex">{currency.toUpperCase()}</div>
					<div className="flex">{currency.toUpperCase()}</div>
				</div>
			</div>
		</div>
	);
}
