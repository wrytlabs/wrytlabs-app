import AppCard from '@components/AppCard';
import { SOCIAL } from '@utils';

export default function PageHome() {
	return (
		<AppCard>
			<div className="font-semibold">Welcome to WRYT labs.</div>

			<div>Discover a space dedicated to exploring and advancing decentralized technologies.</div>

			<div>
				This platform serves as a hub where we develop, integrate, and share innovative tools with the world. From trading models
				and DeFi solutions to DAOs and Governance Systems, our toolbox is designed to showcase and experiment with the latest
				advancements.
			</div>

			<div>
				With a commitment to transparency, all our work is open source, inviting you to explore and engage with the tools that drive
				the future of decentralized systems.{' '}
				<a className="cursor-pointer underline" href={SOCIAL.Github_contract} target="_blank">
					Visit us on Github
				</a>
			</div>

			<div className="font-semibold">Join us in shaping the future of open and decentralized technologies!</div>
		</AppCard>
	);
}
