import { useState } from 'react';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import { toast } from 'react-toastify';
import { formatCurrency, shortenAddress } from '@utils';
import { renderErrorTxToast, TxToast } from '@components/TxToast';
import { useAccount } from 'wagmi';
import { formatUnits } from 'viem';
import { WAGMI_CONFIG } from '../../../app.config';
import { LeverageMorphoInstance } from '../../../redux/slices/morpho.scale.types';
import { LeverageMorphoABI } from '@wrytlabs/frankencoin-utils';
import GuardToAllowedChainBtn from '@components/Input/GuardToAllowedChainBtn';
import AppButton from '@components/AppButton';

interface Props {
	instance: LeverageMorphoInstance;
	amount: bigint;
	disabled?: boolean;
}

export default function LeverageMorphoActionBorrow({ instance, amount, disabled }: Props) {
	const [isAction, setAction] = useState<boolean>(false);
	const [isHidden, setHidden] = useState<boolean>(false);
	const account = useAccount();

	const handleOnClick = async function (e: any) {
		e.preventDefault();
		if (!account.address) return;

		try {
			setAction(true);
			const writeHash = await writeContract(WAGMI_CONFIG, {
				address: instance.address,
				abi: LeverageMorphoABI,
				functionName: 'borrow',
				args: [amount],
			});

			const toastContent = [
				{
					title: `Borrow amount: `,
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
					render: <TxToast title={`Borrowing loan...`} rows={toastContent} />,
				},
				success: {
					render: <TxToast title="Successfully borrowed" rows={toastContent} />,
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
			<AppButton className="h-10" disabled={isHidden || disabled} isLoading={isAction} onClick={(e) => handleOnClick(e)}>
				Borrow
			</AppButton>
		</GuardToAllowedChainBtn>
	);
}
