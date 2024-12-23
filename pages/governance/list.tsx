'use client';

import AppPage from '@components/AppPage';
import MembershipListTable from '../../sections/governance/list/MembershipListTable';
import AppTitle from '@components/AppTitle';
import CommingSoon from '@components/CommingSoon';

export default function GovernanceList() {
	return (
		<AppPage>
			<AppTitle title="List of Memberships">
				<div className="text-text-secondary">
					View and manage all membership contracts where you hold member, executor, or admin roles
				</div>
			</AppTitle>

			<MembershipListTable />

			<CommingSoon
				className="mt-10 text-text-secondary"
				text={'Discover upcoming governance modules with advanced access control features'}
			/>
		</AppPage>
	);
}
