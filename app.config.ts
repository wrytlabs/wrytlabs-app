'use client';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { cookieStorage, createStorage, http } from '@wagmi/core';
import { injected, coinbaseWallet, walletConnect, safe } from '@wagmi/connectors';
import { mainnet, polygon, Chain } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { createDeribitClient, createDeribitClientPublic, GrantType } from '@wrytlabs/deribit-api-client';
import axios from 'axios';

if (process.env.NEXT_PUBLIC_WAGMI_ID === undefined) throw new Error('NEXT_PUBLIC_WAGMI_ID not available');
if (process.env.NEXT_PUBLIC_RPC_URL_MAINNET === undefined) throw new Error('NEXT_PUBLIC_RPC_URL_MAINNET not available');
if (process.env.NEXT_PUBLIC_RPC_URL_POLYGON === undefined) throw new Error('NEXT_PUBLIC_RPC_URL_POLYGON not available');

// Deribit
if (process.env.NEXT_PUBLIC_CLIENT_ID === undefined) throw new Error('NEXT_PUBLIC_CLIENT_ID not available');
if (process.env.NEXT_PUBLIC_CLIENT_SECRET === undefined) throw new Error('NEXT_PUBLIC_CLIENT_SECRET not available');

// Config
export type ConfigEnv = {
	verbose: boolean;
	landing: string;
	app: string;
	api: string;
	indexer: string;
	rpc: string;
	wagmiId: string;
	chain: Chain;
};
export const CONFIG: ConfigEnv = {
	verbose: false,

	landing: process.env.NEXT_PUBLIC_LANDINGPAGE_URL || 'https://wrytlabs.io',
	app: process.env.NEXT_PUBLIC_APP_URL || 'https://app.wrytlabs.io',
	api: process.env.NEXT_PUBLIC_API_URL || 'https://api.wrytlabs.io',
	indexer: process.env.NEXT_PUBLIC_INDEXER_URL || 'https://indexer.wrytlabs.io',
	chain: process.env.NEXT_PUBLIC_CHAIN_NAME === 'mainnet' ? mainnet : polygon,
	wagmiId: process.env.NEXT_PUBLIC_WAGMI_ID,
	rpc:
		process.env.NEXT_PUBLIC_CHAIN_NAME === 'mainnet'
			? process.env.NEXT_PUBLIC_RPC_URL_MAINNET
			: process.env.NEXT_PUBLIC_RPC_URL_POLYGON,
};

// log only in verbose mode
if (CONFIG.verbose) {
	console.log('YOU ARE USING THIS CONFIG PROFILE:');
	console.log(CONFIG);
}

// PONDER CLIENT
export const PONDER_CLIENT = new ApolloClient({
	uri: CONFIG.indexer,
	cache: new InMemoryCache(),
});

// API CLIENT
export const API_CLIENT = axios.create({
	baseURL: CONFIG.api,
});

// DERIBIT WS API CLIENT
export const DERIBIT_WS_CLIENT = createDeribitClient({
	type: GrantType.client_credentials,
	baseUrl: 'wss://www.deribit.com/ws/api/v2',
	clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
	clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export const DERIBIT_WS_CLIENT_PUBLIC = createDeribitClientPublic();

// WAGMI CONFIG
export const WAGMI_CHAIN = CONFIG.chain;
export const WAGMI_METADATA = {
	name: 'Wryt Labs',
	description: 'Web3 Application to interact with Wryt Labs Tools',
	url: CONFIG.landing,
	icons: [],
};

// WAGMI ADAPTER
export const WAGMI_ADAPTER = new WagmiAdapter({
	networks: [WAGMI_CHAIN],
	transports: {
		[CONFIG.chain.id]: http(CONFIG.rpc),
	},
	batch: {
		multicall: {
			wait: 200,
		},
	},
	connectors: [
		safe({
			allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/, /dhedge.org$/],
		}),
		walletConnect({ projectId: CONFIG.wagmiId, metadata: WAGMI_METADATA, showQrModal: false }),
		injected({ shimDisconnect: true }),
		coinbaseWallet({
			appName: WAGMI_METADATA.name,
			appLogoUrl: WAGMI_METADATA.icons[0],
		}),
	],
	ssr: true,
	storage: createStorage({
		storage: cookieStorage,
	}),
	projectId: CONFIG.wagmiId,
});

// WAGMI CONFIG
export const WAGMI_CONFIG = WAGMI_ADAPTER.wagmiConfig;
