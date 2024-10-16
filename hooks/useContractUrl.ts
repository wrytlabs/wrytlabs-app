import { Chain, Hash } from 'viem';
import { WAGMI_CHAIN } from '../app.config';

export const useContractUrl = (address: string, chain: Chain = WAGMI_CHAIN) => {
	const explorerLink = chain?.blockExplorers?.default.url || 'https://etherscan.io';
	return explorerLink + '/address/' + address;
};

export const useBitcoinUrl = (address: string) => {
	const explorerLink = `https://www.blockchain.com/explorer/addresses/btc/`;
	return explorerLink + address;
};

export const useTxUrl = (hash: Hash, chain: Chain = WAGMI_CHAIN) => {
	const explorerLink = chain?.blockExplorers?.default.url || 'https://etherscan.io';
	return explorerLink + '/tx/' + hash;
};
