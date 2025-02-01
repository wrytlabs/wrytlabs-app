import AppCard from '@components/AppCard';
import { useState } from 'react';
import { ResponseAddressBTC, ResponseAddressETH } from '../../mock/ResponseAddress';
import { VaultDepositQRBox } from './VaultDepositQRBox';
import AppTitle from '@components/AppTitle';

export function VaultDepositQRCard() {
	const [depositAddressBtc, setDepositAddressBtc] = useState<string>(ResponseAddressBTC.result.address);
	const [depositAddressEth, setDepositAddressEth] = useState<string>(ResponseAddressETH.result.address);

	return (
		<AppCard>
			<AppTitle className="pt-0" title="Your Safeguard Addresses" />
			<div className={`grid lg:grid-cols-2 gap-4`}>
				<VaultDepositQRBox address={depositAddressBtc} blockchain={'bitcoin'} />

				<VaultDepositQRBox address={depositAddressEth} blockchain={'ethereum'} />
			</div>
		</AppCard>
	);
}
