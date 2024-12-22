'use client';

import CommingSoon from '@components/CommingSoon';
import AppPage from '@components/AppPage';
import AppTitle from '@components/AppTitle';
import { useParams } from 'next/navigation';

export default function GovernanceEdit() {
	const params = useParams();
	const address = params.address as string;

	return (
		<AppPage>
			<AppTitle title="List of Memberships">
				<div className="text-text-secondary">
					View and manage all membership contracts where you hold member, executor, or admin roles
				</div>
			</AppTitle>

			<CommingSoon
				className="mt-10 text-text-secondary"
				text={'Discover upcoming governance modules with advanced access control features'}
			/>
		</AppPage>
	);
}
