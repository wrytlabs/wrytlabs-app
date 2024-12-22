import AppPage from '@components/AppPage';
import MembershipTable from '../../sections/governance/list/MembershipTable';
import AppTitle from '@components/AppTitle';

export default function GovernanceList() {
	return (
		<AppPage>
			<AppTitle title="List of Memberships">
				<div className="text-text-secondary">Add description here</div>
			</AppTitle>

			<MembershipTable />
		</AppPage>
	);
}
