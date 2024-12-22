'use client';

import CommingSoon from '@components/CommingSoon';
import AppPage from '@components/AppPage';
import AppTitle from '@components/AppTitle';
import { Address, isAddress } from 'viem';
import { useRouter as useNavigation } from 'next/navigation';
import { useRouter } from 'next/router';

export default function GovernanceEdit() {
	const router = useRouter();
	const navigate = useNavigation();

	const valid = isAddress(router.query.address?.toString() ?? '');
	if (!valid) navigate.push('/governance/list');

	const address = router.query.address as Address;

	return (
		<AppPage>
			<AppTitle title="Edit Membership">
				<div className="text-text-secondary">
					View and manage all {address} membership contracts where you hold member, executor, or admin roles
				</div>
			</AppTitle>

			<CommingSoon
				className="mt-10 text-text-secondary"
				text={'Discover upcoming governance modules with advanced access control features'}
			/>
		</AppPage>
	);
}
