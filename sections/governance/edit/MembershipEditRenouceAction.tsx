import { useState } from 'react';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import { CONFIG, WAGMI_CONFIG } from '../../../app.config';
import { toast } from 'react-toastify';
import { shortenAddress } from '@utils';
import { useAccount } from 'wagmi';
import WalletConnectGuard from '@components/WalletConnectGuard';
import AppButton from '@components/AppButton';
import { renderErrorTxToast, TxToast } from '@components/TxToast';
import { Address, Hash } from 'viem';
import { MembershipABI, ADDRESS } from '@wrytlabs/manager-core';

interface Props {
	membership: Address;
	role?: string;
	roleHex: Hash;
	disabled?: boolean;
}

export default function MembershipEditRenouceAction({ membership, role = '', roleHex, disabled }: Props) {
	const [isAction, setAction] = useState<boolean>(false);
	const { address } = useAccount();
	const [isHidden, setHidden] = useState<boolean>(false);

	const handleOnClick = async function (e: any) {
		e.preventDefault();
		if (!address) return;

		try {
			setAction(true);

			const writeHash = await writeContract(WAGMI_CONFIG, {
				address: membership,
				abi: MembershipABI,
				functionName: 'renounceRole',
				args: [roleHex as Hash, address],
			});

			const toastContent = [
				{
					title: `Membership: `,
					value: shortenAddress(membership),
				},
				{
					title: `Renouncing role: `,
					value: role,
				},
				{
					title: 'Transaction: ',
					hash: writeHash,
				},
			];

			await toast.promise(waitForTransactionReceipt(WAGMI_CONFIG, { hash: writeHash, confirmations: 1 }), {
				pending: {
					render: <TxToast title={`Renoucing role...`} rows={toastContent} />,
				},
				success: {
					render: <TxToast title="Successfully renouced role" rows={toastContent} />,
				},
			});

			setHidden(true);
		} catch (error) {
			toast.error(renderErrorTxToast(error));
		} finally {
			setAction(false);
		}
	};

	return (
		<WalletConnectGuard label={'Renouce'} disabled={isHidden || disabled}>
			<div className="overflow-hidden">
				<AppButton
					className="h-10 scroll-nopeak"
					disabled={isHidden || disabled}
					isLoading={isAction}
					onClick={(e) => handleOnClick(e)}
				>
					{'Renouce'}
				</AppButton>
			</div>
		</WalletConnectGuard>
	);
}
