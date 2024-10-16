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

export const useTxUrl = (hash: Hash | string, chain: Chain = WAGMI_CHAIN) => {
	const explorerLink = chain?.blockExplorers?.default.url || 'https://etherscan.io';
	return explorerLink + '/tx/' + hash;
};

export const useBitcoinTxUrl = (hash: Hash | string) => {
	const explorerLink = 'https://www.blockchain.com/explorer/transactions/btc/';
	return explorerLink + hash;
};
