import AppBox from '@components/AppBox';
import AppCard from '@components/AppCard';

export default function BorrowOverview() {
	return (
		<AppCard>
			<div className="grid md:grid-cols-4 md:gap-4">
				{/* show balance reference */}
				<AppBox>
					<div className="">Balance e.g. 0.2 BTC</div>
					<div className="">Balance e.g. 20k USD</div>
				</AppBox>

				{/* show cashflow reference */}
				<AppBox>
					<div className="">Cash In e.g. 15k USD</div>
					<div className="">Cash Out e.g. 8k USD</div>
				</AppBox>

				{/* show leverage reference */}
				<AppBox>
					<div className="">Liquidation e.g. 48.2k USD</div>
					<div className="">Margin e.g. 40%</div>
				</AppBox>

				{/* show earnings reference */}
				<AppBox>
					<div className="">Earned e.g. 5k USD</div>
					<div className="">Earned e.g. 4%</div>
				</AppBox>
			</div>
		</AppCard>
	);
}
