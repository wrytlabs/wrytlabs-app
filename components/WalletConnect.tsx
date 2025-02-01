import { useAppKit } from '@reown/appkit/react';
import { useAccount } from 'wagmi';
import Button from './AppButton';

export default function WalletConnect() {
	const AppKit = useAppKit();
	const { isConnected } = useAccount();

	if (!isConnected) {
		return (
			<Button width="w-36" onClick={() => AppKit.open()}>
				Connect Wallet
			</Button>
		);
	} else {
		return (
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-2 font-bold">{<appkit-button balance="hide" />}</div>
			</div>
		);
	}
}
