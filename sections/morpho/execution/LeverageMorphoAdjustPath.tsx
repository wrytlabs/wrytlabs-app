import { useEffect, useState } from 'react';
import { Address, erc20Abi } from 'viem';
import { readContract } from 'wagmi/actions';
import { WAGMI_CONFIG } from '../../../app.config';
import TokenLogo from '@components/TokenLogo';
import AppBox from '@components/AppBox';
import { formatCurrency } from '@utils';

interface Props {
	path: UniswapPath;
}

export type UniswapPath = {
	pools: Address[];
	fees: number[];
};

export default function LeverageMorphoAdjustPath({ path }: Props) {
	const [route, setRoute] = useState<(string | number)[]>([]);

	useEffect(() => {
		// if (path.pools.length < 2 || path.pools.length != path.fees.length + 1) return;
		if (path.pools.length == 0) return;

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
		<AppBox>
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
		</AppBox>
	);
}
