'use client';

import AppTitle from '@components/AppTitle';
import AppPage from '@components/AppPage';
import Head from 'next/head';
import AddressInput from '@components/Input/AddressInput';
import AppCard from '@components/AppCard';
import NormalInput from '@components/Input/NormalInput';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { readContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import { WAGMI_CHAIN, WAGMI_CONFIG } from '../../../app.config';
import { renderErrorTxToast, TxToast } from '@components/TxToast';
import { ADDRESS, LeverageMorphoFactoryABI } from '@wrytlabs/frankencoin-utils';
import { Address, erc20Abi, isAddress, parseEther, parseUnits } from 'viem';
import { useAccount } from 'wagmi';
import GuardToAllowedChainBtn from '@components/Input/GuardToAllowedChainBtn';
import AppButton from '@components/AppButton';

export default function MorphoScaleCreate() {
	const [isAction, setAction] = useState<boolean>(false);
	const [loanAddress, setLoanAddress] = useState<string>('');
	const [loanName, setLoanName] = useState<string>('');
	const [collAddress, setCollAddress] = useState<string>('');
	const [collName, setCollName] = useState<string>('');
	const [oracleAddress, setOracleAddress] = useState<string>('');
	const [irmAddress, setIrmAddress] = useState<string>('0x870aC11D48B15DB9a138Cf899d20F13F79Ba00BC');
	const [lltv, setLltv] = useState<string>(parseUnits('86', 16).toString());
	const { address } = useAccount();

	useEffect(() => {
		if (isAddress(loanAddress)) {
			const getName = async () => {
				const name = await readContract(WAGMI_CONFIG, {
					address: loanAddress,
					abi: erc20Abi,
					functionName: 'name',
				});
				setLoanName(name);
			};
			getName();
		} else {
			setLoanName('');
		}
	}, [loanAddress]);

	useEffect(() => {
		if (isAddress(collAddress)) {
			const getName = async () => {
				const name = await readContract(WAGMI_CONFIG, {
					address: collAddress,
					abi: erc20Abi,
					functionName: 'name',
				});
				setCollName(name);
			};
			getName();
		} else {
			setCollName('');
		}
	}, [collAddress]);

	const handleAction = async () => {
		if (address == undefined) return;

		try {
			setAction(true);

			const actionHash = await writeContract(WAGMI_CONFIG, {
				address: ADDRESS[WAGMI_CHAIN.id].leverageMorphoFactory,
				abi: LeverageMorphoFactoryABI,
				functionName: 'create',
				args: [
					loanAddress as Address,
					collAddress as Address,
					oracleAddress as Address,
					irmAddress as Address,
					BigInt(lltv),
					address,
				],
			});

			const toastContent = [
				{
					title: `Loan Token: `,
					value: loanName,
				},
				{
					title: `Collateral: `,
					value: collName,
				},
				{
					title: 'Transaction: ',
					hash: actionHash,
				},
			];

			await toast.promise(waitForTransactionReceipt(WAGMI_CONFIG, { hash: actionHash, confirmations: 1 }), {
				pending: {
					render: <TxToast title={`Creating new Position`} rows={toastContent} />,
				},
				success: {
					render: <TxToast title="Successfully Created" rows={toastContent} />,
				},
			});
		} catch (error) {
			toast.error(renderErrorTxToast(error));
		} finally {
			setAction(false);
		}
	};

	return (
		<AppPage>
			<Head>
				<title>Wryt - Morpho: Scale Create</title>
			</Head>

			<AppTitle title="Leverage Morpho">
				<div className="text-text-secondary"></div>
			</AppTitle>

			<div className="grid md:grid-cols-2 max-md:grid-cols-1 gap-2">
				<AppCard>
					<AddressInput
						label={`Loan Address ${loanName ? ' - ' + loanName : ''}`}
						error={''}
						placeholder="0x..."
						value={loanAddress}
						onChange={setLoanAddress}
						autoFocus={false}
					/>

					<AddressInput
						label={`Collateral Address ${collName ? ' - ' + collName : ''}`}
						error={''}
						placeholder="0x..."
						value={collAddress}
						onChange={setCollAddress}
						autoFocus={false}
					/>

					<AddressInput
						label="Oracle Address"
						error={''}
						placeholder="0x..."
						value={oracleAddress}
						onChange={setOracleAddress}
						autoFocus={false}
					/>

					<AddressInput
						label="IRM Address"
						error={''}
						placeholder="0x..."
						value={irmAddress}
						onChange={setIrmAddress}
						autoFocus={false}
					/>

					<NormalInput label="LLTV" symbol="%" error={''} digit={16} value={lltv} onChange={setLltv} placeholder="Number" />

					<GuardToAllowedChainBtn>
						<AppButton onClick={handleAction}>Create</AppButton>
					</GuardToAllowedChainBtn>
				</AppCard>
			</div>
		</AppPage>
	);
}
