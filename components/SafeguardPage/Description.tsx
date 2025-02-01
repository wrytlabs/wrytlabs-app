import AppCard from '@components/AppCard';
import AppTitle from '@components/AppTitle';
import { faArrowUpRightFromSquare, faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

export default function SafeguardDescription() {
	return (
		<AppTitle title="Safeguard your assets">
			<div className="text-text-secondary">
				<span className="font-semibold">Safeguard your assets</span> in a segregated account under the custody of Deribit. This
				secure approach ensures enhanced protection and management of your funds while relying on a trusted custodian.
			</div>

			<div className="text-text-secondary">
				<Link href="https://www.deribit.com/kb/custody-options" target="_blank" className="underline cursor-pointer">
					Learn more about Deribit Custody
					<FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-2" />
				</Link>
			</div>

			<div className="relative w-full h-10">
				<div className="absolute bottom-0 right-0 rounded-lg">
					<Link href="https://www.deribit.com/kb/about-us" target="_blank" className="underline cursor-pointer">
						<Image
							className="rounded-lg opacity-90"
							src="/assets/deribit.png"
							width={100}
							height={100}
							alt="Deribit Logo"
						></Image>
					</Link>
				</div>
			</div>
		</AppTitle>
	);
}
