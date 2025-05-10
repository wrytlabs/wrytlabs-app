'use client';

import AppTitle from '@components/AppTitle';
import AppPage from '@components/AppPage';
import Head from 'next/head';
import { useRouter as useNavigation } from 'next/navigation';
import { useRouter } from 'next/router';
import { Address, isAddress, zeroAddress } from 'viem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/redux.store';
import AppLink from '@components/AppLink';
import AppCard from '@components/AppCard';
import LeverageMorphoAdjustLoan from '../../../../sections/morpho/edit/LeverageMorphoAdjustLoan';
import LeverageMorphoAdjustCollateral from '../../../../sections/morpho/edit/LeverageMorphoAdjustCollateral';

export default function MorphoScaleEdit() {
	const router = useRouter();
	const navigate = useNavigation();
	const { factory } = useSelector((state: RootState) => state.morphoScale);

	const valid = isAddress(router.query.address?.toString() ?? '');
	if (!valid) navigate.push('/morpho/scale/edit');

	const address = router.query.address as Address;
	const instance = factory.find((i) => i.address.toLowerCase() == address.toLowerCase());

	return (
		<AppPage>
			<Head>
				<title>Wryt - Morpho: Scale Edit</title>
			</Head>

			<AppTitle title="Leverage Morpho">
				<div className="text-text-secondary">
					View leveraged position with detailed metrics on collateral, borrowed amounts and health factor.{' '}
					<AppLink
						label={'Details of Position.'}
						href={`/morpho/scale/list/${address ?? zeroAddress}`}
						external={false}
						className=""
					/>
				</div>
			</AppTitle>

			{instance ? (
				<>
					<LeverageMorphoAdjustLoan instance={instance} />
					<LeverageMorphoAdjustCollateral instance={instance} />
					<AppCard>Execution</AppCard>
				</>
			) : null}
		</AppPage>
	);
}
