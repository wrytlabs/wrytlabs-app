import { Dispatch, SetStateAction, useState } from 'react';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import { toast } from 'react-toastify';
import { formatCurrency, shortenAddress } from '@utils';
import { renderErrorTxToast, TxToast } from '@components/TxToast';
import { useAccount, useChainId } from 'wagmi';
import { Address, erc20Abi, formatUnits, parseUnits } from 'viem';
import { WAGMI_CONFIG } from '../../../app.config';
import { LeverageMorphoInstance } from '../../../redux/slices/morpho.scale.types';
import { LeverageMorphoABI } from '@wrytlabs/frankencoin-utils';
import GuardToAllowedChainBtn from '@components/Input/GuardToAllowedChainBtn';
import AppButton from '@components/AppButton';
import { UniswapPath } from './LeverageMorphoAdjustPath';

interface Props {
	instance: LeverageMorphoInstance;
	inputLoan?: bigint;
	inputCollateral?: bigint;
	flash: bigint;
	allowanceLoan: bigint;
	allowanceCollateral: bigint;
	path: UniswapPath;
	slippage: number;
	disabled?: boolean;
}

export default function LeverageMorphoActionIncrease({
	instance,
	inputLoan = 0n,
	inputCollateral = 0n,
	flash,
	allowanceLoan,
	allowanceCollateral,
	path,
	slippage,
	disabled,
}: Props) {
	const [isApproving, setApproving] = useState<boolean>(false);
	const [isAction, setAction] = useState<boolean>(false);
	const [isHidden, setHidden] = useState<boolean>(false);
	const account = useAccount();

	const swapIn = inputLoan + flash;
	const calcOutRaw = (swapIn * parseUnits('1', instance.collateralDecimals)) / instance.price;
	const calcOut = (calcOutRaw * BigInt(10000 - slippage * 100)) / BigInt(10000);

	console.log({ swapIn, calcOutRaw, calcOut, method: 'Increase' });

	const handleApprove = async (e: any) => {
		e.preventDefault();
		if (!account.address) return;

		try {
			setApproving(true);

			const approveWriteHash = await writeContract(WAGMI_CONFIG, {
				address: instance.loan as Address,
				abi: erc20Abi,
				functionName: 'approve',
				args: [instance.address, inputLoan],
			});

			const toastContent = [
				{
					title: 'Amount:',
					value: formatCurrency(formatUnits(inputLoan, instance.loanDecimals)) + instance.loanSymbol,
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

	const handleApproveColl = async (e: any) => {
		e.preventDefault();
		if (!account.address) return;

		try {
			setApproving(true);

			const approveWriteHash = await writeContract(WAGMI_CONFIG, {
				address: instance.collateral as Address,
				abi: erc20Abi,
				functionName: 'approve',
				args: [instance.address, inputCollateral],
			});

			const toastContent = [
				{
					title: 'Amount:',
					value: formatCurrency(formatUnits(inputCollateral, instance.collateralDecimals)) + instance.collateralSymbol,
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
					render: <TxToast title={`Approving ${instance.collateralSymbol}`} rows={toastContent} />,
				},
				success: {
					render: <TxToast title={`Successfully Approved ${instance.collateralSymbol}`} rows={toastContent} />,
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
			const inputs = [inputLoan, inputCollateral, flash, path.pools, path.fees, calcOut] as const;
			console.log(inputs);

			const writeHash = await writeContract(WAGMI_CONFIG, {
				address: instance.address,
				abi: LeverageMorphoABI,
				functionName: 'increase',
				args: inputs,
			});

			const toastContent = [
				{
					title: `Execution: Increase `,
					value: `${formatCurrency(formatUnits(flash, instance.loanDecimals))} ${instance.loanSymbol}`,
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
					render: <TxToast title={`Increasing...`} rows={toastContent} />,
				},
				success: {
					render: <TxToast title="Successfully increased" rows={toastContent} />,
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
			{inputLoan > allowanceLoan ? (
				<AppButton className="h-10" disabled={isHidden || disabled} isLoading={isApproving} onClick={(e) => handleApprove(e)}>
					Approve Loan
				</AppButton>
			) : inputCollateral > allowanceCollateral ? (
				<AppButton className="h-10" disabled={isHidden || disabled} isLoading={isApproving} onClick={(e) => handleApproveColl(e)}>
					Approve Collateral
				</AppButton>
			) : (
				<AppButton className="h-10" disabled={isHidden || disabled} isLoading={isAction} onClick={(e) => handleOnClick(e)}>
					Increase
				</AppButton>
			)}
		</GuardToAllowedChainBtn>
	);
}
