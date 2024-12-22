'use client';

import AppCard from '@components/AppCard';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function PageGoals() {
	return (
		<AppCard>
			<div className="font-semibold">Our Goals at WRYT labs.</div>

			<div>We aim to advance decentralized technologies by continuously developing and integrating cutting-edge tools.</div>

			<div className="grid grid-cols-1 w-full my-4 ml-6">
				<ul className="flex flex-col gap-4">
					<li className="flex justify-left items-center">
						<FontAwesomeIcon icon={faCircleCheck} className="w-8 h-8" />
						<span className="ml-5 text-center">Inovate new concepts</span>
					</li>
					<li className="flex justify-left items-center">
						<FontAwesomeIcon icon={faCircleCheck} className="w-8 h-8" />
						<span className="ml-5 text-center">Experiment with Web3</span>
					</li>
					<li className="flex justify-left items-center">
						<FontAwesomeIcon icon={faCircleCheck} className="w-8 h-8" />
						<span className="ml-5 text-center">Share as open source</span>
					</li>
					<li className="flex justify-left items-center">
						<FontAwesomeIcon icon={faCircleCheck} className="w-8 h-8" />
						<span className="ml-5 text-center">Collaborating with others</span>
					</li>
				</ul>
			</div>

			<div className="font-semibold">
				By achieving these goals, we hope to drive meaningful progress in the decentralized space and inspire future innovation.
			</div>
		</AppCard>
	);
}
