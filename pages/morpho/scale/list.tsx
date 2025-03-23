'use client';

import AppTitle from '@components/AppTitle';
import LeverageMorphoTable from '../../../sections/morpho/LeverageMorphoTable';
import AppPage from '@components/AppPage';

export default function MorphoScaleList() {
	return (
		<AppPage>
			<AppTitle title="Leverage Morpho" />
			<LeverageMorphoTable />
		</AppPage>
	);
}
