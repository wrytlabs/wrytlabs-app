import AppCard from '@components/AppCard';
import Image from 'next/image';

export default function EarnDescription() {
	return (
		<AppCard>
			<div className="">
				<span className="font-semibold">The Earn Approach</span> provides a hedge similar to a stablecoin, letting you earn a return
				while keeping your assets in Bitcoin.
			</div>

			<div className="">
				You can transfer your safeguarded balance or deposit directly into your Earn segregated account under Deribit’s custody.
				This allows our backend to create synthetic dollars by holding Bitcoin as collateral and selling covered futures to collect
				a predefined premium. While your asset will remain in Bitcoin, it will reflect the USD value rather then the deposited
				Bitcoin amount.
			</div>

			<div className="relative w-full h-10">
				<div className="absolute bottom-0 right-0 rounded-lg">
					<a href="https://www.deribit.com/kb/about-us" target="_blank" className="underline cursor-pointer">
						<Image
							className="rounded-lg opacity-90"
							src="/assets/deribit.png"
							width={100}
							height={100}
							alt="Deribit Logo"
						></Image>
					</a>
				</div>
			</div>
		</AppCard>
	);
}
