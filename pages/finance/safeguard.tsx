'use client';

import AppPage from '@components/AppPage';
import SafeguardDeposit from '@components/SafeguardPage/Deposit';
import SafeguardDepositTable from '@components/SafeguardPage/DepositTable';
import SafeguardDescription from '@components/SafeguardPage/Description';
import SafeguardPortfolio from '@components/SafeguardPage/Portfolio';
import SelectTabs from '@components/Select/SelectTabs';
import { useState } from 'react';

export default function FinanceToolsSafeguardPage() {
	const actions: string[] = ['Deposit', 'Withdrawal', 'Send', 'Receive'];
	const [action, setAction] = useState<string>(actions[0]);

	return (
		<AppPage>
			<SafeguardDescription />

			<SafeguardPortfolio />

			<SelectTabs title="What would you like to do?" tab={action} tabs={actions} setTab={setAction} />

			{action == actions[0] && (
				<>
					<SafeguardDeposit />

					<SafeguardDepositTable />
				</>
			)}
		</AppPage>
	);
}
