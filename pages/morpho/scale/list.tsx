'use client';

import AppTitle from '@components/AppTitle';
import LeverageMorphoTable from '../../../sections/morpho/LeverageMorphoTable';
import AppPage from '@components/AppPage';
import Head from 'next/head';
import AppLink from '@components/AppLink';

export default function MorphoScaleList() {
	return (
		<AppPage>
			<Head>
				<title>Wryt - Morpho: Scale List</title>
			</Head>

			<AppTitle title="Leverage Morpho">
				<div className="text-text-secondary">
					<AppLink label={'Create a Leverage Morpho Position'} href="/morpho/scale/create" external={false} className="" /> which
					allows you to amplify your exposure to crypto assets by creating leveraged positions using Morpho markets.
				</div>
			</AppTitle>

			<LeverageMorphoTable />
		</AppPage>
	);
}
