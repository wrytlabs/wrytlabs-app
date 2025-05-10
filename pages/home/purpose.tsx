'use client';

import AppTitle from '@components/AppTitle';

export default function PagePurpose() {
	return (
		<AppTitle title="Our Purpose at WRYT labs">
			<div className="flex flex-col gap-8 mt-8">
				<div>
					Our mission is to push the boundaries of decentralized technologies by developing and integrating innovative tools. This
					platform serves as a foundation for exploring new ideas, experimenting with concepts, and sharing these advancements
					with the wider community.
				</div>

				<div>
					Whether it is trading models, DeFi solutions, DAOs, or governance systems, each tool we create reflects our commitment
					to open-source development and transparency. By sharing our work, we aim to contribute to the ongoing evolution of
					decentralized systems and help shape the future of this space.
				</div>

				<div className="font-semibold">Join us in shaping the future of open and decentralized technologies!</div>
			</div>
		</AppTitle>
	);
}
