import { useEffect, useState } from 'react';
import { Address, erc20Abi } from 'viem';
import { readContract } from 'wagmi/actions';
import { WAGMI_CONFIG } from '../../../app.config';
import TokenLogo from '@components/TokenLogo';
import AppBox from '@components/AppBox';
import { formatCurrency } from '@utils';
import { LeverageMorphoInstance } from '../../../redux/slices/morpho.scale.types';

interface Props {
	instance: LeverageMorphoInstance;
	path: UniswapPath;
}

export type UniswapPath = {
	pools: Address[];
	fees: number[];
};

export default function LeverageMorphoAdjustPath({ instance, path }: Props) {
	const [route, setRoute] = useState<(string | number)[]>([]);
	const [error, setError] = useState('');
	const [valid, setValid] = useState(false);

	useEffect(() => {
		if (path.pools.length == 0) return;

		if (path.pools.length > 1) {
			const p = path.pools;
			if (p.at(0)!.toLowerCase() == instance.loan.toLowerCase() && p.at(-1)!.toLowerCase() == instance.collateral.toLowerCase()) {
				if (!valid) {
					setValid(true);
					setError('');
				}
			} else if (valid) {
				setValid(false);
				setError(`Path is invalid. ${instance.loanSymbol} - ... - ${instance.collateralSymbol}`);
			}
		}

		const fetcher = async () => {
			const proms = path.pools.map((p) =>
				readContract(WAGMI_CONFIG, {
					address: p,
					abi: erc20Abi,
					functionName: 'symbol',
				})
			);

			const results = await Promise.allSettled(proms);
			const isError = results.find((r) => r.status === 'rejected');
			const data = results.filter((r) => r.status === 'fulfilled').map((r) => r.value);

			if (isError) {
				setError('Token info request rejected...');
			}

			if (data.length == 1) {
				setRoute(data);
			} else {
				const route = data.map((i, idx) => (idx < data.length - 1 ? [i, path.fees[idx]] : [i])).flat();
				setRoute(route);
			}
		};

		fetcher();
	}, [path]);

	return (
		<AppBox className={`border-2 ${error.length > 0 ? 'border-text-warning' : valid ? 'border-text-success' : ''}`}>
			<div className={`grid grid-cols-${route.length} items-center justify-center`}>
				{route.map((i, idx) =>
					typeof i == 'string' ? (
						<div className="flex justify-center items-center">
							<TokenLogo currency={i as string} key={`TokenLogo_${idx}_s`} />
						</div>
					) : (
						<div className="flex justify-center items-center">{formatCurrency(i / 10000)}%</div>
					)
				)}
			</div>

			{error.length > 0 && <div className="text-center mt-4">{error}</div>}
		</AppBox>
	);
}
