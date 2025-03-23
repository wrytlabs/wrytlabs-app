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
					<p>
						Leverage Morpho allows you to amplify your exposure to crypto assets by creating leveraged positions using Morpho
						markets.
					</p>
					<ul className="list-disc pl-5 mt-2 space-y-1">
						<li>Create isolated leveraged positions with customizable parameters</li>
						<li>Utilize Morpho lending markets for efficient borrowing</li>
						<li>Swap tokens automatically through Uniswap for position management</li>
						<li>Monitor your positions with real-time blockchain data</li>
						<li>Increase, decrease, or close positions with simple operations</li>
					</ul>
					<div className="mt-3">
						<AppLink label={'Create New Position'} href="/morpho/scale/create" external={false} className="pr-1" />
					</div>
				</div>
			</AppTitle>

			<LeverageMorphoTable />
		</AppPage>
	);
}
