/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	disable: false,
	disableDevLogs: false,
});

const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ['@wrtylabs/api'],

	// @dev: if you want to set the iFrame SAMEORIGIN headers,
	// to prevent injecting in cross domains.
	// headers: [
	// 	{
	// 		key: "X-Frame-Options",
	// 		value: "SAMEORIGIN",
	// 	},
	// ],

	// @dev: Needed for SAFE testing locally
	headers: async () => [
		{
			source: '/manifest.json',
			headers: [
				{
					key: 'Access-Control-Allow-Origin',
					value: '*',
				},
				{
					key: 'Access-Control-Allow-Methods',
					value: 'GET',
				},
				{
					key: 'Access-Control-Allow-Headers',
					value: 'X-Requested-With, content-type, Authorization',
				},
			],
		},
	],
};

module.exports = nextConfig;
