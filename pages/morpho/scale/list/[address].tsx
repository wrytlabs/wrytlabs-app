'use client';

import AppTitle from '@components/AppTitle';
import AppPage from '@components/AppPage';
import Head from 'next/head';
import { useRouter as useNavigation } from 'next/navigation';
import { useRouter } from 'next/router';
import { Address, isAddress, zeroAddress } from 'viem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/redux.store';
import LeverageMorphoNotFound from '../../../../sections/morpho/LeverageMorphoNotFound';
import LeverageMorphDetails from '../../../../sections/morpho/LeverageMorphoDetails';
import AppLink from '@components/AppLink';
import LeverageMorphoLoanTable from '../../../../sections/morpho/details/LeverageMorphoLoanTable';
import LeverageMorphoCollateralTable from '../../../../sections/morpho/details/LeverageMorphoCollateralTable';
import LeverageMorphoExecuteTable from '../../../../sections/morpho/details/LeverageMorphoExecuteTable';
import LeverageMorphoAdjustLoan from '../../../../sections/morpho/edit/LeverageMorphoAdjustLoan';
import LeverageMorphoAdjustCollateral from '../../../../sections/morpho/edit/LeverageMorphoAdjustCollateral';

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
					View leveraged position with detailed metrics on collateral, borrowed amounts and health factor.{' '}
					<AppLink
						label={'Edit this Position.'}
						href={`/morpho/scale/edit/${address ?? zeroAddress}`}
						external={false}
						className=""
					/>
				</div>
			</AppTitle>

			{instance ? <LeverageMorphDetails instance={instance} /> : <LeverageMorphoNotFound address={address} />}

			{instance ? (
				<>
					{/* balance chart / equity */}

					<AppTitle title="Loan Adjustments">
						<div className="text-text-secondary">View borrow and repays. </div>
					</AppTitle>

					<LeverageMorphoAdjustLoan instance={instance} />

					<LeverageMorphoLoanTable instance={instance} />

					<AppTitle title="Collateral Adjustments">
						<div className="text-text-secondary">View deposits and withdraws. </div>
					</AppTitle>

					<LeverageMorphoAdjustCollateral instance={instance} />

					<LeverageMorphoCollateralTable instance={instance} />

					<AppTitle title="Executions">
						<div className="text-text-secondary">View executions. </div>
					</AppTitle>

					<LeverageMorphoExecuteTable instance={instance} />
				</>
			) : null}
		</AppPage>
	);
}
