'use client';

import AppPage from '@components/AppPage';
import SafeguardDeposit from '@components/SafeguardPage/Deposit';
import SafeguardDepositTable from '@components/SafeguardPage/DepositTable';
import SafeguardDescription from '@components/SafeguardPage/Description';
import SafeguardPortfolio from '@components/SafeguardPage/Portfolio';

export default function FinanceToolsSafeguardPage() {
	return (
		<AppPage>
			<SafeguardDescription />

			<SafeguardPortfolio />

			<SafeguardDeposit />

			<SafeguardDepositTable />
		</AppPage>
	);
}
