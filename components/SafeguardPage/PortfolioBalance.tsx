import AppCard from '@components/AppCard';
import { ResponsePortfolio } from '../../mock/ResponsePortfolio';
import { useState } from 'react';
import AppBox from '@components/AppBox';
import { formatCurrency, FormatType } from '@utils';
import TokenLogo from '@components/TokenLogo';

export default function SafeguardPortfolioBalance() {
	const [portfolio, setPortfolio] = useState(ResponsePortfolio);

	const currencies = ['btc', 'eth', 'usdt', 'usdc'];
	const matching = Object.values(portfolio)
		.filter((p) => currencies.includes(p.currency))
		.sort((a, b) => currencies.indexOf(a.currency) - currencies.indexOf(b.currency));

	return (
		<AppCard>
			<div className="text-xl font-semibold">Your Safeguard Balances</div>
			<div className={`grid lg:grid-cols-2 gap-4`}>{matching.map((p) => SafeguardPortfolioBalanceItem(p))}</div>
		</AppCard>
	);
}

export type SafeguardPortfolioBalanceItemProps = {
	additional_reserve: number;
	spot_reserve: number;
	available_withdrawal_funds: number;
	available_funds: number;
	initial_margin: number;
	maintenance_margin: number;
	equity: number;
	margin_balance: number;
	currency: string;
	balance: number;
};

export function SafeguardPortfolioBalanceItem({ currency, balance, equity }: SafeguardPortfolioBalanceItemProps) {
	return (
		<AppBox>
			<div className="flex flex-row gap-4">
				<div className="flex items-center">
					<TokenLogo currency={currency} />
				</div>

				<div className="flex-1 font-semibold">
					<div className="flex justify-end">{formatCurrency(equity, 4, 4, FormatType.us)}</div>
					<div className="flex justify-end">{formatCurrency(equity, 4, 4, FormatType.us)}</div>
				</div>

				<div className="flex flex-col w-12">
					<div className="flex">{currency.toUpperCase()}</div>
					<div className="flex">USD</div>
				</div>
			</div>
		</AppBox>
	);
}
