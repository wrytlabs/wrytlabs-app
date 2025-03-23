'use client';

import AppTitle from '@components/AppTitle';
import AppPage from '@components/AppPage';
import Head from 'next/head';
import AddressInput from '@components/Input/AddressInput';
import AppCard from '@components/AppCard';
import NormalInput from '@components/Input/NormalInput';

export default function MorphoScaleCreate() {
	return (
		<AppPage>
			<Head>
				<title>Wryt - Morpho: Scale Create</title>
			</Head>

			<AppTitle title="Leverage Morpho">
				<div className="text-text-secondary"></div>
			</AppTitle>

			<div className="grid md:grid-cols-2 max-md:grid-cols-1 gap-2">
				<AppCard>
					<AddressInput label="Loan Address" error={''} placeholder="0x..." value={''} onChange={() => {}} autoFocus={false} />

					<AddressInput
						label="Collateral Address"
						error={''}
						placeholder="0x..."
						value={''}
						onChange={() => {}}
						autoFocus={false}
					/>

					<AddressInput label="Oracle Address" error={''} placeholder="0x..." value={''} onChange={() => {}} autoFocus={false} />

					<AddressInput label="IRM Address" error={''} placeholder="0x..." value={''} onChange={() => {}} autoFocus={false} />

					<NormalInput label="LLTV" symbol="%" error={''} digit={0} value={'86'} onChange={() => {}} placeholder="Number" />
				</AppCard>
			</div>
		</AppPage>
	);
}
