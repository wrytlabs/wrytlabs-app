import AppCard from '@components/AppCard';
import { ResponsePortfolio } from '../../mock/ResponsePortfolio';
import { useState } from 'react';
import { PortfolioBalanceBox } from './PortfolioBalanceBox';

export default function SafeguardPortfolio() {
	const [portfolio, setPortfolio] = useState(ResponsePortfolio);

	const currencies = ['btc', 'eth', 'usdt', 'usdc'];
	const matching = Object.values(portfolio)
		.filter((p) => currencies.includes(p.currency))
		.sort((a, b) => currencies.indexOf(a.currency) - currencies.indexOf(b.currency));

	return (
		<AppCard>
			<div className="text-xl font-semibold">Your Safeguard Balances</div>
			<div className={`grid lg:grid-cols-2 gap-4`}>{matching.map((p) => PortfolioBalanceBox(p))}</div>
		</AppCard>
	);
}
