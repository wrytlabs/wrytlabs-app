import { Address } from 'viem';
import AppCard from '@components/AppCard';

interface Props {
	address: Address;
}

export default function LeverageMorphoNotFound({ address }: Props) {
	return <AppCard>Could not find {address}.</AppCard>;
}
