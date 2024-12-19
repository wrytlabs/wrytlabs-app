import AppBox from '@components/AppBox';
import AppCard from '@components/AppCard';
import AppTitle from '@components/AppTitle';
import BorrowInteractionDetails from './BorrowInteractionDetails';

export default function BorrowInteraction() {
	return (
		<div className="grid md:grid-cols-2 md:gap-4">
			<AppCard>
				<span className={`font-bold text-xl`}>Select Payout</span>
				{/* input field with currency */}

				<span className={`font-bold text-xl`}>Select Whitelisted Address</span>
				{/* input selector */}
			</AppCard>

			{/* show interaction details, seperate component */}
			<BorrowInteractionDetails />
		</div>
	);
}
