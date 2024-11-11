'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function WalletConnect() {
	const [isLoaded, setLoaded] = useState<boolean>(false);
	const Web3Modal = useWeb3Modal();
	const { isConnected } = useAccount();

	useEffect(() => {
		setLoaded(isConnected);
	}, [isConnected]);

	if (isLoaded) {
		return (
			<div className="flex items-center gap-2 font-bold">
				<w3m-button balance="hide" />
			</div>
		);
	} else {
		return (
			<div
				className="bg-layout-secondary text-text-secondary h-8 md:h-10 flex items-center rounded-3xl px-4 font-semibold"
				onClick={() => Web3Modal.open()}
			>
				Connect Wallet
			</div>
		);
	}
}
