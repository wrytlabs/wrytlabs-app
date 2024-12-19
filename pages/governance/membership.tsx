import { WAGMI_CONFIG } from '../../app.config';
import { signTypedData, verifyTypedData } from '@wagmi/core';

export default function PageMembership() {
	const handleSignData = async () => {
		const data = await signTypedData(WAGMI_CONFIG, {
			domain: {
				name: 'Ether Mail',
				chainId: 137,
				verifyingContract: '0xEDb0b22A3f755824462c5128D6df289fc4CDBE8c',
			},
			types: {
				Person: [
					{ name: 'name', type: 'string' },
					{ name: 'wallet', type: 'address' },
				],
				Mail: [
					{ name: 'from', type: 'Person' },
					{ name: 'to', type: 'Person' },
					{ name: 'contents', type: 'string' },
				],
			},
			primaryType: 'Mail',
			message: {
				from: {
					name: 'Cow',
					wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
				},
				to: {
					name: 'Bob',
					wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
				},
				contents: 'Hello, Bob!',
			},
		});

		console.log(data);

		const isValid = await verifyTypedData(WAGMI_CONFIG, {
			domain: {
				name: 'Ether Mail',
				chainId: 137,
				verifyingContract: '0xEDb0b22A3f755824462c5128D6df289fc4CDBE8c',
			},
			types: {
				Person: [
					{ name: 'name', type: 'string' },
					{ name: 'wallet', type: 'address' },
				],
				Mail: [
					{ name: 'from', type: 'Person' },
					{ name: 'to', type: 'Person' },
					{ name: 'contents', type: 'string' },
				],
			},
			primaryType: 'Mail',
			message: {
				from: {
					name: 'Cow',
					wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
				},
				to: {
					name: 'Bob',
					wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
				},
				contents: 'Hello, Bob!',
			},
			address: '0x0170F42f224b99CcbbeE673093589c5f9691dd06',
			signature: data,
		});

		console.log({ isValid });
	};

	return (
		<button className="bg-card-content-primary p-4 rounded-2xl" onClick={handleSignData}>
			Sign message
		</button>
	);
}
