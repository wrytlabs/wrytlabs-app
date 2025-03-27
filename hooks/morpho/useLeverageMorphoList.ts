import { gql, useQuery } from '@apollo/client';
import { Address } from 'viem';

export interface LeverageMorphoFactory {
	address: Address;
	createdAt: number;
	creator: Address;
	txHash: string;
	owner: Address;
	marketId: string;
	loan: Address;
	loanDecimals: number;
	loanName: string;
	loanSymbol: string;
	collateral: Address;
	collateralDecimals: number;
	collateralName: string;
	collateralSymbol: string;
	oracle: Address;
	irm: Address;
	lltv: bigint;
}

export const useLeverageMorphoFactory = (): {
	loading: boolean;
	leverageMorphoFactory: LeverageMorphoFactory[];
} => {
	const { data, loading, client } = useQuery(
		gql`
			{
				leverageMorphoFactorys(orderBy: "createdAt", orderDirection: "DESC") {
					items {
						address
						createdAt
						marketId
						txHash
						owner
						marketId
						loan
						loanDecimals
						loanName
						loanSymbol
						collateral
						collateralDecimals
						collateralName
						collateralSymbol
						oracle
						irm
						lltv
					}
				}
			}
		`,
		{ fetchPolicy: 'network-only', nextFetchPolicy: 'cache-first' }
	);

	if (loading || !data || !data.leverageMorphoFactorys) {
		return {
			loading,
			leverageMorphoFactory: [],
		};
	}

	return {
		loading,
		leverageMorphoFactory: data.leverageMorphoFactorys.items,
	};
};
