'use client';

import AppPage from '@components/AppPage';
import AppTitle from '@components/AppTitle';
import MembershipCreate from '../../sections/governance/create/MembershipCreate';

export default function GovernanceCreatePage() {
	return (
		<AppPage>
			<AppTitle title="Create a Memberships">
				<div className="text-text-secondary">Create membership contracts where you manage member, executor, or admin roles</div>
			</AppTitle>

			<MembershipCreate />
		</AppPage>
	);
}
