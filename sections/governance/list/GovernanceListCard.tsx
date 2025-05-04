import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCakeCandles, faFileContract, faGavel, faLocationPin, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency } from '@utils';
import AppLink from '@components/AppLink';
import { formatUnits } from 'viem';

interface Props {
	name: string;
	symbol: string;
	link: string;
	sector: string;
	logoSrc: string;
	type: string;
	location: string;
	description: string;
	totalSupply: bigint;
	digits: number;
	founded: string;
}

export function GovernanceListCard({
	name,
	symbol,
	link,
	logoSrc,
	sector,
	type,
	location,
	description,
	totalSupply,
	digits,
	founded,
}: Props) {
	return (
		<div className="bg-card-body-primary p-6 rounded-xl shadow-xl">
			{/* logo */}
			<div className="flex">
				<div className="w-[64px] h-[64px] relative shadow-md rounded-xl">
					<Image className="rounded-xl object-cover" src={logoSrc} alt="Logo" fill sizes="64px" />
				</div>
			</div>

			{/* title and subtitle */}
			<div className="pt-6">
				<AppLink className="font-bold text-xl" label={name} href={link} external={true} />
			</div>
			<div className="text-text-secondary">{sector}</div>

			{/* description */}
			<div className="mt-4 text-text-secondary text-sm h-[10rem]">
				{description}
				{/* FIXME: add link */}
				<AppLink className="" label=" Learn more." href="/list/..." external={false} />
			</div>

			{/* line */}
			<div className="bg-text-secondary rounded-xl h-[1px] w-full my-6"></div>

			{/* footer details */}
			<div className="grid grid-cols-2 text-sm">
				<div className="flex flex-col">
					<div className="flex gap-2 items-center">
						<FontAwesomeIcon icon={faPeopleGroup} className="w-5" />
						<AppLink className="" label={type} href={link} external={true} />
					</div>
					<div className="flex gap-2 items-center">
						<FontAwesomeIcon icon={faLocationPin} className="w-5" />
						<div className="">{location}</div>
					</div>
				</div>
				<div className="flex flex-col">
					<div className="flex gap-2 items-center">
						<FontAwesomeIcon icon={faFileContract} className="w-5" />
						{formatCurrency(formatUnits(totalSupply, digits))}
						<span className="text-sm">{symbol}</span>
					</div>
					<div className="flex gap-2 items-center">
						<FontAwesomeIcon icon={faCakeCandles} className="w-5" />
						<div className="">{founded}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
