'use client';

import AppPage from '@components/AppPage';
import MembershipListTable from '../../sections/governance/list/MembershipListTable';
import AppTitle from '@components/AppTitle';
// import CommingSoon from '@components/CommingSoon';
// import AppCard from '@components/AppCard';
// import Link from 'next/link';
// import MembershipCreateAction from '../../sections/governance/create/MembershipCreateAction';
import { useAccount } from 'wagmi';
import { zeroAddress } from 'viem';

export default function GovernanceList() {
	const { address } = useAccount();
	const addr = address ?? zeroAddress;

	return (
		<AppPage>
			<AppTitle title="List of Memberships">
				<div className="text-text-secondary">
					View and manage all membership contracts where you hold member, executor, or admin roles
				</div>
			</AppTitle>

			<MembershipListTable />

			{/* <AppCard>
				<div key="create" className="flex flex-col gap-4 items-center justify-center text-center">
					<p className="text-text-secondary">Create a Membership with member, executor and admin roles</p>
					<div className="w-32">
						<MembershipCreateAction admin={addr} executor={addr} member={addr} disabled={!address} />
					</div>
				</div>
			</AppCard> */}
		</AppPage>
	);
}
