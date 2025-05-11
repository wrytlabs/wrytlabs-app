import { Dispatch, SetStateAction, useState } from 'react';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import { toast } from 'react-toastify';
import { formatCurrency, shortenAddress } from '@utils';
import { renderErrorTxToast, TxToast } from '@components/TxToast';
import { useAccount, useChainId } from 'wagmi';
import { parseUnits } from 'viem';
import { WAGMI_CONFIG } from '../../../app.config';
import { LeverageMorphoInstance } from '../../../redux/slices/morpho.scale.types';
import { LeverageMorphoABI } from '@wrytlabs/frankencoin-utils';
import GuardToAllowedChainBtn from '@components/Input/GuardToAllowedChainBtn';
import AppButton from '@components/AppButton';
import { UniswapPath } from './LeverageMorphoAdjustPath';

interface Props {
	instance: LeverageMorphoInstance;
	path: UniswapPath;
	slippage: number;
	disabled?: boolean;
}

export default function LeverageMorphoActionClose({ instance, path, slippage, disabled }: Props) {
	const [isAction, setAction] = useState<boolean>(false);
	const [isHidden, setHidden] = useState<boolean>(false);
	const account = useAccount();

	const swapIn = 0n;
	const calcOutRaw = (swapIn * instance.price) / parseUnits('1', instance.collateralDecimals);
	const calcOut = (calcOutRaw * BigInt(1_000_000 - slippage * 100)) / BigInt(1_000_000);

	const handleOnClick = async function (e: any) {
		e.preventDefault();
		if (!account.address) return;

		try {
			setAction(true);

			const writeHash = await writeContract(WAGMI_CONFIG, {
				address: instance.address,
				abi: LeverageMorphoABI,
				functionName: 'close',
				args: [[...path.pools].reverse(), [...path.fees].reverse(), 0n],
			});

			const toastContent = [
				{
					title: `Execution: Close `,
					value: `Closing position and returns ${instance.loanSymbol}`,
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
					render: <TxToast title={`Closing...`} rows={toastContent} />,
				},
				success: {
					render: <TxToast title="Successfully closed" rows={toastContent} />,
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
				Close
			</AppButton>
		</GuardToAllowedChainBtn>
	);
}
