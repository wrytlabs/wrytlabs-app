import AppCard from '@components/AppCard';
import { ResponsePortfolio } from '../../mock/ResponsePortfolio';
import { useState } from 'react';

export default function SafeguardPortfolioBalance() {
	const [portfolio, setPortfolio] = useState(ResponsePortfolio);

	const currencies = ['btc', 'eth', 'usdt', 'usdc'];
	const matching = Object.values(portfolio)
		.filter((p) => currencies.includes(p.currency))
		.sort((a, b) => currencies.indexOf(a.currency) - currencies.indexOf(b.currency));

	return (
		<AppCard>
			<div className="mt-3 mb-5 px-3 text-xl font-semibold">Your Safeguard Balances</div>
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
		<div className="bg-yellow-200 hover:bg-yellow-300 cursor-pointer rounded-xl shadow-md px-5 py-2 mx-2">
			<div>Symbol: {currency.toUpperCase()}</div>
			<div>Equity: {equity}</div>
			<div>Balance: {balance}</div>
		</div>
	);
}
