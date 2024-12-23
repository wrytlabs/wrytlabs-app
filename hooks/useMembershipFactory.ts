import { gql, useQuery } from '@apollo/client';
import { Address } from 'viem';

export interface MembershipFactory {
	address: Address;
	createdAt: number;
	creator: Address;
	txHash: string;
}

export const useMembershipFactory = (): {
	loading: boolean;
	membershipFactory: MembershipFactory[];
} => {
	const { data, loading, client } = useQuery(
		gql`
			{
				membershipFactorys(orderBy: "createdAt", orderDirection: "desc", limit: 1000) {
					items {
						address
						createdAt
						creator
						txHash
					}
				}
			}
		`,
		{ fetchPolicy: 'no-cache' }
	);

	if (loading || !data || !data.membershipFactorys) {
		return {
			loading,
			membershipFactory: [],
		};
	}

	return {
		loading,
		membershipFactory: data.membershipFactorys.items,
	};
};
