import { Dispatch, SetStateAction, useState } from 'react';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import { toast } from 'react-toastify';
import { formatCurrency, shortenAddress } from '@utils';
import { renderErrorTxToast, TxToast } from '@components/TxToast';
import { useAccount, useChainId } from 'wagmi';
import { Address, erc20Abi, formatUnits } from 'viem';
import { WAGMI_CONFIG } from '../../../app.config';
import { LeverageMorphoInstance } from '../../../redux/slices/morpho.scale.types';
import { LeverageMorphoABI } from '@wrytlabs/frankencoin-utils';
import GuardToAllowedChainBtn from '@components/Input/GuardToAllowedChainBtn';
import AppButton from '@components/AppButton';

interface Props {
	instance: LeverageMorphoInstance;
	amount: bigint;
	allowance: bigint;
	disabled?: boolean;
}

export default function LeverageMorphoActionRepay({ instance, amount, allowance, disabled }: Props) {
	const [isApproving, setApproving] = useState<boolean>(false);
	const [isAction, setAction] = useState<boolean>(false);
	const [isHidden, setHidden] = useState<boolean>(false);
	const account = useAccount();

	const handleApprove = async (e: any) => {
		e.preventDefault();
		if (!account.address) return;

		try {
			setApproving(true);

			const approveWriteHash = await writeContract(WAGMI_CONFIG, {
				address: instance.loan as Address,
				abi: erc20Abi,
				functionName: 'approve',
				args: [instance.address, amount],
			});

			const toastContent = [
				{
					title: 'Amount:',
					value: formatCurrency(formatUnits(amount, instance.loanDecimals)) + instance.loanSymbol,
				},
				{
					title: 'Spender: ',
					value: shortenAddress(instance.address),
				},
				{
					title: 'Transaction:',
					hash: approveWriteHash,
				},
			];

			await toast.promise(waitForTransactionReceipt(WAGMI_CONFIG, { hash: approveWriteHash, confirmations: 1 }), {
				pending: {
					render: <TxToast title={`Approving ${instance.loanSymbol}`} rows={toastContent} />,
				},
				success: {
					render: <TxToast title={`Successfully Approved ${instance.loanSymbol}`} rows={toastContent} />,
				},
			});
		} catch (error) {
			toast.error(renderErrorTxToast(error));
		} finally {
			setApproving(false);
		}
	};

	const handleOnClick = async function (e: any) {
		e.preventDefault();
		if (!account.address) return;

		try {
			setAction(true);
			const writeHash = await writeContract(WAGMI_CONFIG, {
				address: instance.address,
				abi: LeverageMorphoABI,
				functionName: 'repay',
				args: [amount],
			});

			const toastContent = [
				{
					title: `Repay amount: `,
					value: `${formatCurrency(formatUnits(amount, instance.loanDecimals))} ${instance.loanSymbol}`,
				},
				{
					title: `Instance: `,
					value: shortenAddress(instance.address),
				},
				{
					title: 'Transaction: ',
					hash: writeHash,
				},
			];

			await toast.promise(waitForTransactionReceipt(WAGMI_CONFIG, { hash: writeHash, confirmations: 1 }), {
				pending: {
					render: <TxToast title={`Repaying loan...`} rows={toastContent} />,
				},
				success: {
					render: <TxToast title="Successfully repaid" rows={toastContent} />,
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
		<GuardToAllowedChainBtn>
			{amount > allowance ? (
				<AppButton className="h-10" disabled={isHidden || disabled} isLoading={isApproving} onClick={(e) => handleApprove(e)}>
					Approve
				</AppButton>
			) : (
				<AppButton className="h-10" disabled={isHidden || disabled} isLoading={isAction} onClick={(e) => handleOnClick(e)}>
					Repay
				</AppButton>
			)}
		</GuardToAllowedChainBtn>
	);
}
