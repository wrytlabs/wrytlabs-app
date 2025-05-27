import { useAccount } from 'wagmi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import AppButton from './AppButton';
import { zeroAddress } from 'viem';
import { API_CLIENT } from '../app.config';
import { useSignMessage } from 'wagmi';
import { useEffect, useState } from 'react';
import { Id, toast } from 'react-toastify';
import { shortenAddress } from '@utils';

export default function ApiConnect() {
	const { address, status } = useAccount();
	const [isToken, setIsToken] = useState(false);
	const [message, setMessage] = useState('');
	const [signature, setSignature] = useState('');
	const [toastId, setToastId] = useState<Id>(0);

	const { signMessage, isPending } = useSignMessage({
		mutation: {
			async onSuccess(data) {
				setSignature(data);
			},
			async onError(error) {
				toast.update(toastId, {
					render: `Failed to sign in: ${error}`,
					type: 'error',
					isLoading: false,
					autoClose: 3000,
				});
			},
		},
	});

	const handleClick = async () => {
		if (address == undefined) return;

		const response = await API_CLIENT.post('/auth/message', { address });
		const toastId = toast.loading(`Signing in as ${shortenAddress(address)}...`);

		setMessage(response.data);
		signMessage({ message: response.data });
		setToastId(toastId);
	};

	useEffect(() => {
		if (!address && !isToken) false;
		else if (!address && isToken) {
			setIsToken(false);
		} else if (address && !isToken && localStorage.getItem('accessToken')) {
			setIsToken(true);
		}
	}, [status, isToken, address]);

	useEffect(() => {
		if (message.length == 0 || signature.length == 0 || address == zeroAddress || address == undefined) return;

		const fetcher = async () => {
			try {
				const signIn = API_CLIENT.post('/auth/signIn', { message, signature });
				const { accessToken } = (await signIn).data;

				if (accessToken) {
					localStorage.setItem('accessToken', accessToken);
					setIsToken(true);
				}

				toast.update(toastId, {
					render: `Signed in as ${shortenAddress(address)}`,
					type: 'success',
					isLoading: false,
					autoClose: 3000,
				});
			} catch (error: any) {
				console.error(error);
				toast.update(toastId, {
					render: `Failed to sign in: ${error?.response?.data?.message}`,
					type: 'error',
					isLoading: false,
					autoClose: 3000,
				});
			} finally {
				setMessage('');
				setSignature('');
			}
		};

		fetcher();
	}, [message, signature, address, isToken, toastId]);

	const disabled = address == undefined || address == zeroAddress || isPending;

	return (
		<AppButton
			className={`${isToken ? 'bg-button-disabled text-button-textdisabled' : undefined}`}
			width={'w-20'}
			onClick={handleClick}
			disabled={disabled}
		>
			<div className="flex flex-row items-center justify-center gap-1 -ml-1">
				<FontAwesomeIcon className={`${isToken ? 'text-button-default' : undefined}`} icon={faLink} width={32} height={32} />
				<div className={`${isToken ? 'text-button-default px-2' : undefined}`}>API</div>
			</div>
		</AppButton>
	);
}
