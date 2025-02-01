import { useState } from 'react';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import { CONFIG, WAGMI_CONFIG } from '../../../app.config';
import { toast } from 'react-toastify';
import { shortenAddress } from '@utils';
import { useAccount } from 'wagmi';
import WalletConnectGuard from '@components/WalletConnectGuard';
import AppButton from '@components/AppButton';
import { renderErrorTxToast, TxToast } from '@components/TxToast';
import { Address } from 'viem';
import { ADDRESS, MembershipFactoryABI } from '@wrytlabs/manager-core';

interface Props {
	admin: Address;
	executor: Address;
	member: Address;
	disabled?: boolean;
}

export default function MembershipCreateAction({ admin, executor, member, disabled }: Props) {
	const [isAction, setAction] = useState<boolean>(false);
	const [isHidden, setHidden] = useState<boolean>(false);
	const { address } = useAccount();

	const handleOnClick = async function (e: any) {
		e.preventDefault();
		if (!address) return;

		try {
			setAction(true);

			const writeHash = await writeContract(WAGMI_CONFIG, {
				address: ADDRESS[CONFIG.chain.id].membershipFactory,
				abi: MembershipFactoryABI,
				functionName: 'createMembership',
				args: [admin, executor, member],
			});

			const toastContent = [
				{
					title: `Admin: `,
					value: shortenAddress(admin),
				},
				{
					title: `Executor: `,
					value: shortenAddress(executor),
				},
				{
					title: `Member: `,
					value: shortenAddress(member),
				},
				{
					title: 'Transaction: ',
					hash: writeHash,
				},
			];

			await toast.promise(waitForTransactionReceipt(WAGMI_CONFIG, { hash: writeHash, confirmations: 1 }), {
				pending: {
					render: <TxToast title={`Creating Membership...`} rows={toastContent} />,
				},
				success: {
					render: <TxToast title="Successfully created Membership" rows={toastContent} />,
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
		<WalletConnectGuard label={'Create'} disabled={isHidden || disabled}>
			<div className="overflow-hidden">
				<AppButton
					className="h-10 scroll-nopeak"
					disabled={isHidden || disabled}
					isLoading={isAction}
					onClick={(e) => handleOnClick(e)}
				>
					{'Create'}
				</AppButton>
			</div>
		</WalletConnectGuard>
	);
}
