import { gql, useQuery } from '@apollo/client';
import { Address } from 'viem';

export interface MembershipPermissionContract {
	address: Address;
	createdAt: number;
	updatedAt: number;
	role: string;
	account: Address;
	txHash: string;
}

export const useMembershipPermissionContract = (
	contract: Address
): {
	loading: boolean;
	MembershipPermission: MembershipPermissionContract[];
} => {
	const { data, loading, client } = useQuery(
		gql`
			{
				membershipRolePermissions(
					where: { address: "${contract}" }
					orderBy: "updatedAt"
					orderDirection: "desc"
					limit: 1000
				) {
					items {
						id
						address
						createdAt
						updatedAt
						txHash
						role
						account
						permission
					}
				}
			}
		`,
		{ fetchPolicy: 'no-cache' }
	);

	if (loading || !data || !data.membershipRolePermissions) {
		return {
			loading,
			MembershipPermission: [],
		};
	}

	return {
		loading,
		MembershipPermission: data.MembershipPermission.items,
	};
};

// ---------------------------------------------------------------------------------------

export interface MembershipPermissionAccount {
	address: Address;
	createdAt: number;
	updatedAt: number;
	role: string;
	account: Address;
	txHash: string;
}

export const useMembershipPermissionAccount = (
	account: Address
): {
	loading: boolean;
	MembershipPermission: MembershipPermissionAccount[];
} => {
	const { data, loading, client } = useQuery(
		gql`
			{
				membershipRolePermissions(
					where: { account: "${account}" }
					orderBy: "updatedAt"
					orderDirection: "desc"
					limit: 1000
				) {
					items {
						id
						address
						createdAt
						updatedAt
						txHash
						role
						account
						permission
					}
				}
			}
		`,
		{ fetchPolicy: 'no-cache' }
	);

	if (loading || !data || !data.membershipRolePermissions) {
		return {
			loading,
			MembershipPermission: [],
		};
	}

	return {
		loading,
		MembershipPermission: data.MembershipPermission.items,
	};
};
