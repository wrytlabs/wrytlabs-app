'use client';

import { useState } from 'react';
import AppPage from '@components/AppPage';
import { VaultDepositCard } from '../../sections/vault/VaultDepositCard';
import { VaultPortfolioCard } from '../../sections/vault/VaultPortfolioCard';
import { VaultDepositQRCard } from '../../sections/vault/VaultDepositQRCard';
import { VaultDepositTable } from '../../sections/vault/VaultDepositTable';
import { Currency } from '@wrytlabs/deribit-api-client';
import VaultSelectTab from '../../sections/vault/VaultSelectTab';

export default function FinanceVaultPage() {
	const actions: string[] = ['Deposit', 'Withdrawal', 'Send', 'Receive'];
	const currencies: string[] = Object.values(Currency);
	const [action, setAction] = useState<string>(actions[0]);
	const [currency, setCurrency] = useState<string>(currencies[0]);

	return (
		<AppPage>
			<VaultDepositCard />

			<VaultPortfolioCard />

			<VaultSelectTab
				title="What would you like to do?"
				actionTab={action}
				actionTabs={actions}
				setAction={setAction}
				currencyTab={currency}
				currencyTabs={currencies}
				setCurrency={setCurrency}
			/>

			{action == actions[0] && (
				<>
					<VaultDepositQRCard />

					<VaultDepositTable />
				</>
			)}
		</AppPage>
	);
}
