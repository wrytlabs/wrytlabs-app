import AppCard from '@components/AppCard';
import { useState } from 'react';
import { Address, zeroAddress } from 'viem';
import MembershipCreateAction from './MembershipCreateAction';

export default function MembershipCreate() {
	const [admin, setAdmin] = useState<string>();
	const [executor, setExecutor] = useState<string>();
	const [member, setMember] = useState<string>();

	return (
		<AppCard>
			<input onChange={(e) => setAdmin(e.target.value)}></input>
			<input onChange={(e) => setExecutor(e.target.value)}></input>
			<input onChange={(e) => setMember(e.target.value)}></input>

			<MembershipCreateAction
				admin={(admin as Address) ?? zeroAddress}
				executor={(executor as Address) ?? zeroAddress}
				member={(member as Address) ?? zeroAddress}
			/>
		</AppCard>
	);
}
