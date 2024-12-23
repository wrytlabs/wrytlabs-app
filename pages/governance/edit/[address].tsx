'use client';

import CommingSoon from '@components/CommingSoon';
import AppPage from '@components/AppPage';
import AppTitle from '@components/AppTitle';
import { Address, isAddress } from 'viem';
import { useRouter as useNavigation } from 'next/navigation';
import { useRouter } from 'next/router';
import MembershipEditRevokeTable from '../../../sections/governance/edit/MembershipEditRevokeTable';
import { shortenAddress } from '@utils';

export default function GovernanceEdit() {
	const router = useRouter();
	const navigate = useNavigation();

	const valid = isAddress(router.query.address?.toString() ?? '');
	if (!valid) navigate.push('/governance/list');

	const address = router.query.address as Address;

	return (
		<AppPage>
			<AppTitle title="Revoke Your Role">
				<div className="text-text-secondary">
					Confirm removal of your role from membership contract <a className="font-semibold">{shortenAddress(address)}</a>
				</div>
			</AppTitle>

			<MembershipEditRevokeTable membership={address} />

			<CommingSoon
				className="mt-10 text-text-secondary"
				text={'Discover upcoming governance modules with advanced access control features'}
			/>
		</AppPage>
	);
}
