import AppCard from '@components/AppCard';
import { useState } from 'react';
import { ResponseAddressBTC, ResponseAddressETH } from '../../mock/ResponseAddress';
import QRCode from 'react-qr-code';
import AppBox from '@components/AppBox';
import AddressLabel from '@components/AddressLabel';

export default function SafeguardDepositCollateral() {
	const [depositAddressBtc, setDepositAddressBtc] = useState<string>(ResponseAddressBTC.result.address);
	const [depositAddressEth, setDepositAddressEth] = useState<string>(ResponseAddressETH.result.address);

	return (
		<AppCard>
			<div className="text-xl font-semibold">Your Safeguard Addresses</div>
			<div className={`grid lg:grid-cols-2 gap-4 max-md:gap-8`}>
				<SafeguardDepositCollateralItem address={depositAddressBtc} blockchain={'bitcoin'} />
				<SafeguardDepositCollateralItem address={depositAddressEth} blockchain={'ethereum'} />
			</div>
		</AppCard>
	);
}

interface Props {
	address: string;
	blockchain: 'bitcoin' | 'ethereum';
}

export function SafeguardDepositCollateralItem({ address, blockchain }: Props) {
	return (
		<div className="flex flex-col gap-4 justify-center items-center">
			<QRCode className="my-6" bgColor="#f7f7f9" fgColor="#092f62" value={address} />

			<div className="flex flex-col gap-0 text-center">
				<div>Only transfer {blockchain === 'bitcoin' ? 'BTC' : 'ETH, USDT or USDC'}</div>
				<div className="text-sm">{blockchain === 'bitcoin' ? '(Bitcoin Network)' : '(Ethereum Network)'}</div>
			</div>

			<AppBox>
				<AddressLabel label={address} address={address} blockchain={blockchain} showCopy showLink />
			</AppBox>
		</div>
	);
}
