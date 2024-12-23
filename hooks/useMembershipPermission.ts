import { gql, useQuery } from '@apollo/client';
import { Address } from 'viem';

export enum MembershipRoles {
	Admin = '0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775',
	Executor = '0xd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e63',
	Member = '0x829b824e2329e205435d941c9f13baf578548505283d29261236d8e6596d4636',
}

export interface MembershipPermission {
	address: Address;
	createdAt: number;
	updatedAt: number;
	txHash: string;
	role: string;
	account: Address;
	permission: boolean;
}

export const useMembershipPermissionContract = (
	contract: Address
): {
	loading: boolean;
	membershipPermissionContract: MembershipPermission[];
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
			membershipPermissionContract: [],
		};
	}

	return {
		loading,
		membershipPermissionContract: data.membershipRolePermissions.items,
	};
};

// ---------------------------------------------------------------------------------------

export const useMembershipPermissionAccount = (
	account: Address
): {
	loading: boolean;
	membershipPermissionAccount: MembershipPermission[];
} => {
	const { data, loading } = useQuery(
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
			membershipPermissionAccount: [],
		};
	}

	return {
		loading,
		membershipPermissionAccount: data.membershipRolePermissions.items,
	};
};
