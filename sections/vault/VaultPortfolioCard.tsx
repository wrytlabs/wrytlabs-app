import AppCard from '@components/AppCard';
import { ResponsePortfolio } from '../../mock/ResponsePortfolio';
import { useState } from 'react';
import { VaultPortfolioBox } from './VaultPortfolioBox';
import AppTitle from '@components/AppTitle';

export function VaultPortfolioCard() {
	const [portfolio, setPortfolio] = useState(ResponsePortfolio);

	const currencies = ['btc', 'eth', 'usdt', 'usdc'];
	const matching = Object.values(portfolio)
		.filter((p) => currencies.includes(p.currency))
		.sort((a, b) => currencies.indexOf(a.currency) - currencies.indexOf(b.currency));

	return (
		<AppCard>
			<AppTitle className="pt-0" title="Your Safeguard Balance" />
			<div className={`grid lg:grid-cols-2 gap-4`}>
				{matching.map((p) => (
					<VaultPortfolioBox key={p.currency} currency={p.currency} amount={p.equity} />
				))}
			</div>
		</AppCard>
	);
}
