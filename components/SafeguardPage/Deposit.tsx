import AppCard from '@components/AppCard';
import { ResponsePortfolio } from '../../mock/ResponsePortfolio';
import { useState } from 'react';
import { PortfolioBalanceBox } from './PortfolioBalanceBox';
import { ResponseAddressBTC, ResponseAddressETH } from '../../mock/ResponseAddress';
import { DepositCollateralBox } from './DepositCollateralBox';

export default function SafeguardDeposit() {
	const [depositAddressBtc, setDepositAddressBtc] = useState<string>(ResponseAddressBTC.result.address);
	const [depositAddressEth, setDepositAddressEth] = useState<string>(ResponseAddressETH.result.address);

	return (
		<AppCard>
			<div className="text-xl font-semibold">Your Safeguard Addresses</div>
			<div className={`grid lg:grid-cols-2 gap-4`}>
				<DepositCollateralBox address={depositAddressBtc} blockchain={'bitcoin'} />

				<DepositCollateralBox address={depositAddressEth} blockchain={'ethereum'} />
			</div>
		</AppCard>
	);
}
