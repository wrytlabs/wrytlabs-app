import { Hash } from 'viem';
import { useBitcoinTxUrl, useTxUrl } from '../hooks/useContractUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { mainnet, polygon } from 'viem/chains';

type Props = {
	label: string;
	hash: string;
	showLink?: boolean;
	blockchain?: 'bitcoin' | 'ethereum' | 'polygon';
	className?: string;
};

export function TransactionLabel({ label, hash, showLink, blockchain, className }: Props) {
	const linkEth = useTxUrl(hash, blockchain === 'ethereum' ? mainnet : polygon);
	const linkBtc = useBitcoinTxUrl(hash);
	const isBitcoin = blockchain === 'bitcoin';

	const openExplorer = (e: any) => {
		e.preventDefault();
		window.open(isBitcoin ? linkBtc : linkEth, '_blank');
	};

	return (
		<div className={className}>
			<span className={showLink ? 'cursor-pointer' : ''} onClick={(e) => (showLink ? openExplorer(e) : undefined)}>
				{label}
			</span>
			{showLink && (
				<span>
					<FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 ml-2 my-auto cursor-pointer" onClick={openExplorer} />
				</span>
			)}
		</div>
	);
}
