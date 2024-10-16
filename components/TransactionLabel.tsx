import { Hash } from 'viem';
import { useTxUrl } from '../hooks/useContractUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

type TxLabelSimpleProps = {
	label: string;
	tx: Hash;
	showLink?: boolean;
	className?: string;
};

// TODO: blockchain btc/evm
export function TxLabelSimple({ label, tx, showLink, className }: TxLabelSimpleProps) {
	const link = useTxUrl(tx);

	const openExplorer = (e: any) => {
		e.preventDefault();
		window.open(link, '_blank');
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
