'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';

export default function WalletConnect() {
	const Web3Modal = useWeb3Modal();
	const { isDisconnected } = useAccount();

	if (isDisconnected) {
		return (
			<div
				className="bg-layout-secondary text-text-secondary h-8 md:h-10 flex items-center rounded-3xl px-4 font-semibold"
				onClick={() => Web3Modal.open()}
			>
				Connect Wallet
			</div>
		);
	} else {
		return (
			<div className="flex items-center gap-2 font-bold">
				<w3m-button balance="hide" />
			</div>
		);
	}
}
