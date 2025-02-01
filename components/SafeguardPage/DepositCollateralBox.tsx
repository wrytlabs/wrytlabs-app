import QRCode from 'react-qr-code';
import AppBox from '@components/AppBox';
import AddressLabel from '@components/AddressLabel';

export interface DepositCollateralBoxProps {
	address: string;
	blockchain: 'bitcoin' | 'ethereum';
}

export function DepositCollateralBox({ address, blockchain }: DepositCollateralBoxProps) {
	return (
		<AppBox>
			<div className="flex flex-col gap-4 justify-center items-center">
				<QRCode className="my-6" bgColor="#e7e7ea" fgColor="#092f62" value={address} />

				<div className="flex flex-col gap-0 text-center">
					<div className="text-sm">Only transfer {blockchain === 'bitcoin' ? 'BTC' : 'ETH, USDT or USDC'}</div>
					<div className="text-sm">{blockchain === 'bitcoin' ? '(Bitcoin Network)' : '(Ethereum Network)'}</div>
				</div>

				<AddressLabel label={address} address={address} blockchain={blockchain} showLink showCopy isOverflow />
			</div>
		</AppBox>
	);
}
