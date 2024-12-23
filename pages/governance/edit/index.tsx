'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { zeroAddress } from 'viem';

export default function GovernanceEditIndex() {
	const router = useRouter();
	useEffect(() => {
		router.replace('/governance/edit/' + zeroAddress);
	}, [router]);
}
