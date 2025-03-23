'use client';

import AppTitle from '@components/AppTitle';
import LeverageMorphoTable from '../../../../sections/morpho/LeverageMorphoTable';
import AppPage from '@components/AppPage';
import Head from 'next/head';
import AppLink from '@components/AppLink';
import { useRouter as useNavigation } from 'next/navigation';
import { useRouter } from 'next/router';
import { Address, isAddress } from 'viem';

export default function MorphoScaleDetails() {
	const router = useRouter();
	const navigate = useNavigation();

	const valid = isAddress(router.query.address?.toString() ?? '');
	if (!valid) navigate.push('/governance/list');

	const address = router.query.address as Address;

	return (
		<AppPage>
			<Head>
				<title>Wryt - Morpho: Scale Details</title>
			</Head>

			<AppTitle title="Leverage Morpho">
				<div className="text-text-secondary">
					<p>give you details aboug Leverage Morpho, exposure to crypto assets by leveraged positions</p>

					<div className="mt-3">
						<AppLink label={address} href="/morpho/scale/edit" external={false} className="pr-1" />
					</div>
				</div>
			</AppTitle>

			{/* logs like collateral changes or loan changes */}
			{/* opcode mapping, incl avg price mapping */}
			{/* ref and pl */}
		</AppPage>
	);
}
