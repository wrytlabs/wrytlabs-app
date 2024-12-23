import { faArrowUpRightFromSquare, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Address, zeroAddress } from 'viem';
import { shortenAddress } from '../utils/format';
import { useBitcoinUrl, useContractUrl } from '../hooks/useContractUrl';
import { mainnet, polygon } from 'viem/chains';

interface Props {
	address: string;
	label?: string;
	showCopy?: boolean;
	showLink?: boolean;
	blockchain?: 'bitcoin' | 'ethereum' | 'polygon';
	className?: string;
	isOverflow?: boolean;
	isTextRight?: boolean;
}

export default function AddressLabel({
	address,
	label,
	showCopy,
	showLink,
	blockchain,
	className,
	isOverflow = false,
	isTextRight = false,
}: Props) {
	const linkEth = useContractUrl(address || zeroAddress, blockchain === 'ethereum' ? mainnet : polygon);
	const linkBtc = useBitcoinUrl(address);

	const handleCopy = (e: any) => {
		e.preventDefault();
		navigator.clipboard.writeText(address);
	};

	const openExplorer = (e: any) => {
		e.preventDefault();
		window.open(blockchain === 'bitcoin' ? linkBtc : linkEth, '_blank');
	};

	return (
		<div className="flex items-center">
			<div className={`${isOverflow ? 'overflow-x-scroll max-md:w-52' : ''} ${isTextRight ? 'flex-1 text-right' : ''}`}>
				<div className={showLink ? 'cursor-pointer' : ''} onClick={(e) => (showLink ? openExplorer(e) : undefined)}>
					{label ?? address}
				</div>
			</div>

			{showCopy && <FontAwesomeIcon icon={faCopy} className="w-3 ml-2 cursor-pointer" onClick={handleCopy} />}

			{showLink && <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 ml-2 cursor-pointer" onClick={openExplorer} />}
		</div>
	);
}
