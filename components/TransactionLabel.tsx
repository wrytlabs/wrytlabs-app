import { Hash } from 'viem';
import { useBitcoinTxUrl, useTxUrl } from '../hooks/useContractUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faCopy } from '@fortawesome/free-solid-svg-icons';
import { mainnet, polygon } from 'viem/chains';

type Props = {
	hash: string;
	label?: string;
	showCopy?: boolean;
	showLink?: boolean;
	blockchain?: 'bitcoin' | 'ethereum' | 'polygon';
	className?: string;
	isOverflow?: boolean;
	isTextRight?: boolean;
};

export function TransactionLabel({
	label,
	hash,
	showCopy,
	showLink,
	blockchain,
	className,
	isOverflow = false,
	isTextRight = false,
}: Props) {
	const linkEth = useTxUrl(hash, blockchain === 'ethereum' ? mainnet : polygon);
	const linkBtc = useBitcoinTxUrl(hash);
	const isBitcoin = blockchain === 'bitcoin';

	const handleCopy = (e: any) => {
		e.preventDefault();
		navigator.clipboard.writeText(hash);
	};

	const openExplorer = (e: any) => {
		e.preventDefault();
		window.open(isBitcoin ? linkBtc : linkEth, '_blank');
	};

	return (
		<div className="flex items-center">
			<div className={`${isOverflow ? 'overflow-x-scroll max-md:w-52' : ''} ${isTextRight ? 'flex-1 text-right' : ''}`}>
				<div className={showLink ? 'cursor-pointer' : ''} onClick={(e) => (showLink ? openExplorer(e) : undefined)}>
					{label ?? hash}
				</div>
			</div>

			{showCopy && <FontAwesomeIcon icon={faCopy} className="w-3 ml-2 cursor-pointer" onClick={handleCopy} />}

			{showLink && <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 ml-2 cursor-pointer" onClick={openExplorer} />}
		</div>
	);
}
