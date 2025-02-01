import AppCard from '@components/AppCard';
import { ResponsePortfolio } from '../../mock/ResponsePortfolio';
import { useState } from 'react';
import { PortfolioBalanceBox } from './PortfolioBalanceBox';
import { ResponseAddressBTC, ResponseAddressETH } from '../../mock/ResponseAddress';
import { DepositCollateralBox } from './DepositCollateralBox';
import AppTitle from '@components/AppTitle';

export default function SafeguardDeposit() {
	const [depositAddressBtc, setDepositAddressBtc] = useState<string>(ResponseAddressBTC.result.address);
	const [depositAddressEth, setDepositAddressEth] = useState<string>(ResponseAddressETH.result.address);

	return (
		<AppCard>
			<AppTitle className="pt-0" title="Your Safeguard Addresses" />
			<div className={`grid lg:grid-cols-2 gap-4`}>
				<DepositCollateralBox address={depositAddressBtc} blockchain={'bitcoin'} />

				<DepositCollateralBox address={depositAddressEth} blockchain={'ethereum'} />
			</div>
		</AppCard>
	);
}
