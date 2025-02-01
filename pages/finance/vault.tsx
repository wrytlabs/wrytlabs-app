'use client';

import { useState } from 'react';
import AppPage from '@components/AppPage';
import SelectTabs from '@components/Select/SelectTabs';
import { VaultDepositCard } from '../../sections/vault/VaultDepositCard';
import { VaultPortfolioCard } from '../../sections/vault/VaultPortfolioCard';
import { VaultDepositQRCard } from '../../sections/vault/VaultDepositQRCard';
import { VaultDepositTable } from '../../sections/vault/VaultDepositTable';

export default function FinanceVaultPage() {
	const actions: string[] = ['Deposit', 'Withdrawal', 'Send', 'Receive'];
	const [action, setAction] = useState<string>(actions[0]);

	return (
		<AppPage>
			<VaultDepositCard />

			<VaultPortfolioCard />

			<SelectTabs title="What would you like to do?" tab={action} tabs={actions} setTab={setAction} />

			{action == actions[0] && (
				<>
					<VaultDepositQRCard />

					<VaultDepositTable />
				</>
			)}
		</AppPage>
	);
}
