import SafeguardDeposit from '@components/SafeguardPage/Deposit';
import SafeguardDescription from '@components/SafeguardPage/Description';
import SafeguardPortfolio from '@components/SafeguardPage/Portfolio';

export default function FinanceToolsSafeguardPage() {
	return (
		<div className="grid gap-5 max-md:gap-8">
			<SafeguardDescription />

			<SafeguardPortfolio />

			<SafeguardDeposit />
		</div>
	);
}
