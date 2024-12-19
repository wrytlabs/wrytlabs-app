import AppPage from '@components/AppPage';
import AppTitle from '@components/AppTitle';
import BorrowInteraction from '@components/BorrowPage/BorrowInteraction';
import BorrowOverview from '@components/BorrowPage/BorrowOverview';

export default function FinanceBorrowPage() {
	return (
		<AppPage>
			<AppTitle title="Borrow on your Assets">
				<div className="text-text-secondary">Add description here</div>
			</AppTitle>

			<BorrowOverview />

			<BorrowInteraction />
		</AppPage>
	);
}
