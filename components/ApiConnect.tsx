import { useAccount } from 'wagmi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import AppButton from './AppButton';
import { Address, zeroAddress } from 'viem';
import { API_CLIENT, WAGMI_CHAIN } from '../app.config';
import { useSignMessage } from 'wagmi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TxToast } from './TxToast';

export default function ApiConnect() {
	const { address, status } = useAccount();
	const [isToken, setIsToken] = useState(false);
	const [message, setMessage] = useState('');
	const [signature, setSignature] = useState('');

	const { signMessage, isPending, isIdle, error } = useSignMessage({
		mutation: {
			async onSuccess(data) {
				setSignature(data);
			},
		},
	});

	const handleClick = async () => {
		if (address == undefined) return;

		const response = await API_CLIENT.post('/auth/message', { address });
		setMessage(response.data);
		signMessage({ message: response.data });

		const toastContent = [
			{
				title: `SignIn `,
				value: address,
			},
		];

		// await toast.promise(signIn, {
		// 	pending: {
		// 		render: <TxToast title={`Creating new Position`} rows={toastContent} />,
		// 	},
		// 	success: {
		// 		render: <TxToast title="Successfully Created" rows={toastContent} />,
		// 	},
		// });
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
		if (message.length == 0 || signature.length == 0 || address == zeroAddress) return;

		const fetcher = async () => {
			const signIn = API_CLIENT.post('/auth/signIn', { message, signature });

			const { accessToken } = (await signIn).data;
			console.log({ accessToken });

			if (accessToken) {
				localStorage.setItem('accessToken', accessToken);
				setIsToken(true);
			}

			setMessage('');
			setSignature('');
		};

		fetcher();
	}, [message, signature, address, isToken]);

	const disabled = address == undefined || address == zeroAddress || isPending;

	console.log({ isToken, disabled });

	return (
		<AppButton
			className={`${isToken ? 'bg-button-disabled text-button-textdisabled' : undefined}`}
			width={'w-12'}
			onClick={handleClick}
			disabled={disabled}
		>
			<FontAwesomeIcon className={`${isToken ? 'text-button-default' : undefined}`} icon={faLink} width={32} height={32} />
		</AppButton>
	);
}
