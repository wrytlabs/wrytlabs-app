'use client';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { cookieStorage, createStorage, http } from '@wagmi/core';
import { injected, coinbaseWallet, walletConnect, safe } from '@wagmi/connectors';
import { mainnet, base } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { createDeribitClient, createDeribitClientPublic, GrantType } from '@wrytlabs/deribit-api-client';
import axios from 'axios';

// WAGMI and RPC
if (process.env.NEXT_PUBLIC_WAGMI_ID === undefined) throw new Error('NEXT_PUBLIC_WAGMI_ID not available');
if (process.env.NEXT_PUBLIC_RPC_URL === undefined) throw new Error('NEXT_PUBLIC_RPC_URL not available');

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
	morphoGraph: string;
	wagmiId: string;
	rpc: string;
};
export const CONFIG: ConfigEnv = {
	verbose: false,

	landing: process.env.NEXT_PUBLIC_LANDINGPAGE_URL || 'https://wrytlabs.io',
	app: process.env.NEXT_PUBLIC_APP_URL || 'https://app.wrytlabs.io',
	api: process.env.NEXT_PUBLIC_API_URL || 'https://api.wrytlabs.io',
	indexer: process.env.NEXT_PUBLIC_INDEXER_URL || 'https://indexer.wrytlabs.io',
	morphoGraph: process.env.NEXT_PUBLIC_MORPHOGRAPH_URL || 'https://blue-api.morpho.org/graphql',
	wagmiId: process.env.NEXT_PUBLIC_WAGMI_ID,
	rpc: process.env.NEXT_PUBLIC_RPC_KEY || ""
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

export const MORPHOGRAPH_CLIENT = new ApolloClient({
	uri: CONFIG.morphoGraph,
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
export const WAGMI_CHAIN = mainnet;
export const WAGMI_CHAINS = [mainnet, base] as const;
export const WAGMI_METADATA = {
	name: 'Wryt Labs',
	description: 'Web3 Application to interact with Wryt Labs Tools',
	url: CONFIG.landing,
	icons: [],
};

// WAGMI ADAPTER
export const WAGMI_ADAPTER = new WagmiAdapter({
	networks: [...WAGMI_CHAINS],
	transports: {
		[mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${CONFIG.rpc}`),
		[base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${CONFIG.rpc}`),
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
