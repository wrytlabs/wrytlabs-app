'use client';

import AppTitle from '@components/AppTitle';
import AppPage from '@components/AppPage';
import Head from 'next/head';
import { useRouter as useNavigation } from 'next/navigation';
import { useRouter } from 'next/router';
import { Address, isAddress } from 'viem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/redux.store';
import LeverageMorphoNotFound from '../../../../sections/morpho/LeverageMorphoNotFound';
import LeverageMorphDetails from '../../../../sections/morpho/LeverageMorphoDetails';

export default function MorphoScaleDetails() {
	const router = useRouter();
	const navigate = useNavigation();
	const { factory } = useSelector((state: RootState) => state.morphoScale);

	const valid = isAddress(router.query.address?.toString() ?? '');
	if (!valid) navigate.push('/morpho/scale/list');

	const address = router.query.address as Address;
	const instance = factory.find((i) => i.address.toLowerCase() == address.toLowerCase());

	return (
		<AppPage>
			<Head>
				<title>Wryt - Morpho: Scale Details</title>
			</Head>

			<AppTitle title="Leverage Morpho">
				<div className="text-text-secondary">
					<p>View leveraged position with detailed metrics on collateral, borrowed amounts and health factor.</p>
				</div>
			</AppTitle>

			{instance ? <LeverageMorphDetails instance={instance} /> : <LeverageMorphoNotFound address={address} />}
		</AppPage>
	);
}
