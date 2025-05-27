import { useAppKit } from '@reown/appkit/react';
import { useAccount } from 'wagmi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import AppButton from './AppButton';
import { useEffect } from 'react';

export default function WalletConnect() {
	const AppKit = useAppKit();
	const { isConnected, status } = useAccount();

	useEffect(() => {
		console.log({ status, storage: localStorage.getItem('accessToken') });
		if (status == 'disconnected') {
			localStorage.removeItem('accessToken');
			console.warn('removed access token from local storage');
		}
	}, [status]);

	return (
		<AppButton className={`${isConnected ? 'bg-button-disabled' : undefined}`} width={'w-20'} onClick={() => AppKit.open()}>
			<div className="flex flex-row items-center justify-center gap-1 -ml-2">
				<FontAwesomeIcon className={`${isConnected ? 'text-button-default' : undefined}`} icon={faWallet} width={32} height={32} />
				<div className={`${isConnected ? 'text-button-default px-2' : undefined}`}>0x</div>
			</div>
		</AppButton>
	);
}
