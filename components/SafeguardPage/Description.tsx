import AppCard from '@components/AppCard';
import Image from 'next/image';

export default function SafeguardDescription() {
	return (
		<AppCard>
			<div className="">
				<span className="font-semibold">Safeguard your assets</span> in a segregated account under the custody of Deribit. This
				secure approach ensures enhanced protection and management of your funds while relying on a trusted custodian.
			</div>

			<div className="">
				<a href="https://www.deribit.com/kb/custody-options" target="_blank" className="underline cursor-pointer">
					Learn more about Deribit
				</a>
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
