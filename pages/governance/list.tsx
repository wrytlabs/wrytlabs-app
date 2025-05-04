'use client';

import AppPage from '@components/AppPage';
import AppTitle from '@components/AppTitle';
import { useAccount } from 'wagmi';
import { parseUnits, zeroAddress } from 'viem';
import { GovernanceListCard } from '../../sections/governance/list/GovernanceListCard';

export default function GovernanceList() {
	const { address } = useAccount();
	const addr = address ?? zeroAddress;

	return (
		<AppPage>
			<AppTitle title="List of Governance">
				<div className="text-text-secondary">
					View and manage all membership contracts where you hold member, executor, or admin roles
				</div>
			</AppTitle>

			<div className="grid md:grid-cols-3 gap-4">
				<GovernanceListCard
					name="WrytLabs"
					symbol="WYTE"
					sector="Reasearch and Development - Web3"
					logoSrc="/assets/wrytlabs.png"
					link="https://app.wrytlabs.io"
					type="DAO"
					location="Mainnet"
					description="Our mission is to push the boundaries of decentralized technologies by developing and integrating innovative tools. Our platform serves as a foundation for exploring new ideas, experimenting with concepts, and sharing these advancements with the wider community."
					totalSupply={parseUnits('10000', 18)}
					digits={18}
					founded="Since 2024"
				/>
				<GovernanceListCard
					name="DeFi Capital Inc."
					symbol="DCAP"
					sector="Trading Company - Crypto"
					logoSrc="/assets/deficapitalinc.png"
					link="https://domain.com"
					type="Private Entity"
					location="Switzerland"
					description="We bridge the gap between blockchain innovation and crypto trading, with a focus on Bitcoin options and futures. Leveraging our market insights and advanced analytics, we expertly manage our Bitcoin reserves to generate additional revenue streams through strategic debt financing."
					totalSupply={100000n}
					digits={0}
					founded="Since 2020"
				/>
				<GovernanceListCard
					name="TradFi Capital Inc."
					symbol="TCAP"
					sector="Trading Company - TradFi"
					logoSrc="/assets/tradficapitalinc.png"
					link="https://app.domain.io"
					type="Private Entity"
					location="Estonia"
					description="Leveraging its expertise in traditional finance with Interactive Brokers UK to access various markets and executes complex trading strategies. Our primary objective is to harness the power of options trading through the application of advanced volatility capture and hedging techniques."
					totalSupply={250000n}
					digits={0}
					founded="Since 2022"
				/>
			</div>
		</AppPage>
	);
}
