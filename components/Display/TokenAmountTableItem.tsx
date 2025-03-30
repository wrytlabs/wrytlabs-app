import dynamic from 'next/dynamic';
import { formatUnits, zeroAddress } from 'viem';
import Link from 'next/link';
import AppLink from '@components/AppLink';
import { useContractUrl } from '../../hooks/useContractUrl';
import { formatCurrency } from '@utils';

const TokenLogo = dynamic(() => import('../TokenLogo'), { ssr: false });

interface Props {
	symbol: string;
	amount: bigint;
	digits?: number;
	address: string;
	className?: string;
	bold?: boolean;
}

export default function TokenAmountTableItem({ bold = true, symbol, amount, digits = 18, address, className }: Props) {
	const url = useContractUrl(address || zeroAddress);

	const openExplorer = (e: any) => {
		e.preventDefault();
		window.open(url, '_blank');
	};

	return (
		<Link href={url} onClick={openExplorer}>
			<div className={`md:-ml-12 flex items-center ${className}`}>
				<div className="mr-4">
					<TokenLogo currency={symbol} />
				</div>

				<div className="flex flex-col">
					<span className={`text-left`}>
						<AppLink label={symbol} href={url} external={true} className="text-left" />
					</span>
					<span className="text-text-subheader text-left max-lg:w-[4rem] lg:w-[7rem] max-sm:w-[9rem] text-sm truncate">
						{formatCurrency(formatUnits(amount, digits))} {symbol}
					</span>
				</div>
			</div>
		</Link>
	);
}
