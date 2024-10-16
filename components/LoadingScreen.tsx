import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { SOCIAL } from '../utils/constant';
import { version } from '../package.json';
import { faCodeCommit } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

export default function LoadingScreen() {
	return (
		<>
			<div className="flex items-center justify-center gap-4 h-screen">
				<div className="flex flex-col items-center gap-8">
					<div className="flex flex-col items-center -mt-20">
						<picture>
							<Image className="h-20 rounded-xl" src="/assets/wrytlabs.png" alt="Logo" width={200} height={150} />
						</picture>
						<h1 className="mt-10">App is loading...</h1>
					</div>

					<div className="absolute bottom-[15%]">
						<h1 className="px-8 text-center">
							This website uses third-party cookies and certain features may not function properly if you choose to block
							them.
						</h1>
					</div>

					<div className="absolute bottom-10">
						<SubmitIssue />
					</div>
				</div>
			</div>
		</>
	);
}

interface ButtonProps {
	link: string;
	text: string;
	icon: IconProp;
}

const FooterButton = ({ link, text, icon }: ButtonProps) => {
	return (
		<Link href={link} target="_blank" rel="noreferrer" className="flex gap-2 hover:opacity-70">
			<FontAwesomeIcon icon={icon} className="w-6 h-6" />
			<div className="hidden sm:block">{text}</div>
		</Link>
	);
};

export function SubmitIssue() {
	return (
		<ul className="flex items-center justify-center gap-8">
			<li>
				<FooterButton link={SOCIAL.Github_dapp_new_issue} text="Submit an Issue" icon={faGithub} />
			</li>
			<li>
				<FooterButton link={SOCIAL.Github_dapp} text={version} icon={faCodeCommit} />
			</li>
		</ul>
	);
}
