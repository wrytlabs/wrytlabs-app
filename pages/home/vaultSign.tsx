'use client';
import { useSignTypedData } from 'wagmi';

import AppTitle from '@components/AppTitle';
import { SOCIAL } from '@utils';
import { useEffect, useState } from 'react';
import NormalInput from '@components/Input/NormalInput';
import AddressInput from '@components/Input/AddressInput';

export default function PageHome() {
	const [nonce, setNonce] = useState(1062);
	const { data, error, signTypedData } = useSignTypedData();

	const dataToSign = {
		domain: {
			verifyingContract: '0xeb4af6fa3afa08b10d593ec8ff87efb03bc04645',
			chainId: BigInt(1),
		},
		types: {
			EIP712Domain: [
				{ name: 'chainId', type: 'uint256' },
				{ name: 'verifyingContract', type: 'address' },
			],
			SafeTx: [
				{ type: 'address', name: 'to' },
				{ type: 'uint256', name: 'value' },
				{ type: 'bytes', name: 'data' },
				{ type: 'uint8', name: 'operation' },
				{ type: 'uint256', name: 'safeTxGas' },
				{ type: 'uint256', name: 'baseGas' },
				{ type: 'uint256', name: 'gasPrice' },
				{ type: 'address', name: 'gasToken' },
				{ type: 'address', name: 'refundReceiver' },
				{ type: 'uint256', name: 'nonce' },
			],
		},
		primaryType: 'SafeTx',
		message: {
			to: '0x3c124fb80e6eedd88d108c2f04013ae5cd571abc',
			value: BigInt(0),
			data: '0xa9059cbb000000000000000000000000201051ae0fddac0ce47b299e4673caa39f32a96100000000000000000000000000000000000000000000001ea50759d411afcf79',
			operation: 0,
			baseGas: BigInt(0),
			gasPrice: BigInt(0),
			gasToken: '0x0000000000000000000000000000000000000000',
			refundReceiver: '0x0000000000000000000000000000000000000000',
			nonce: BigInt(String(nonce)),
			safeTxGas: BigInt(0),
		},
	} as const;

	const handleSign = async () => {
		signTypedData(dataToSign);
	};

	useEffect(() => {
		if (data == undefined) return;

		// const payload = {
		// 	program_payload: {
		// 		program_type: dataToSign.message.base.programType,
		// 		program: {
		// 			vault: dataToSign.message.vault,
		// 			amout: dataToSign.message.amount,
		// 			start: dataToSign.message.base.start,
		// 			end: dataToSign.message.base.end,
		// 			fundsSender: dataToSign.message.base.fundsSender,
		// 			target_chain_id: parseInt(String(dataToSign.message.base.targetChainId)),
		// 			distributor: {
		// 				token_address: dataToSign.message.base.assetAddress,
		// 				urd_address: dataToSign.message.base.distributorAddress,
		// 				chain_id: parseInt(String(dataToSign.message.base.distributorChainId)),
		// 			},
		// 		},
		// 	},
		// 	signature: data,
		// };

		// console.log(payload);

		// const fetcher = async () => {
		// 	const request = await axios.post('https://rewards.morpho.org/v1/programs', payload);
		// 	console.log(request.data);
		// };

		// fetcher();
	}, [data]);

	return (
		<AppTitle title="Welcome to WRYT labs">
			<div className="flex flex-col gap-8 mt-8">
				<div className="max-w-[30rem]">
					<AddressInput value={String(nonce)} onChange={(e) => setNonce(parseInt(e))} />
					<button onClick={handleSign}>Sign Payload</button>
					{data && <p>Signature: {data}</p>}
					{error && <p style={{ color: 'red' }}>{error.message}</p>}
				</div>

				<div className="font-semibold">Join us in shaping the future of open and decentralized technologies!</div>
			</div>
		</AppTitle>
	);
}
