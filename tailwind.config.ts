import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./layout/**/*.{js,ts,jsx,tsx}',
		'./node_modules/flowbite-react/lib/**/*.js',
	],
	safelist: [
		{
			pattern: /grid-cols-/,
			variants: ['sm', 'md', 'lg', 'xl', '2xl'],
		},
	],
	theme: {
		fontFamily: {
			default: ['Avenir', 'Helvetica', 'sans-serif'],
		},
		extend: {
			height: {
				main: 'calc(100vh)',
			},
			minHeight: {
				content: 'calc(100vh - 200px)',
			},
			transitionProperty: {
				height: 'height',
			},
			colors: {
				layout: {
					primary: '#ffffff',
					secondary: '#092f62',
					menu: '#092f62',
					separator: '#f7f7f9',
				},
				menu: {
					text: '#092f62',
					textactive: '#0A80A0',
					active: '#0A80A0',
					hover: '#0A80A0',
					openElement: '#e7e7ea',
					back: '#FFFFFF',
					separator: '#EAEBF0',
				},
				card: {
					body: {
						primary: '#f7f7f9',
						secondary: '#092f62',
						seperator: '#1e293b',
					},
					content: {
						primary: '#e7e7ea', // e7e7ea
						secondary: '#f7f7f9',
						highlight: '#ff293b',
					},
				},
				text: {
					header: '#092f62',
					subheader: '#677180',
					hover: '#b7bfd1',
					primary: '#092f62',
					secondary: '#677180',
					warning: '#ef4444',
					success: '#22c55e',
				},
				table: {
					header: {
						primary: '#f7f7f9',
						secondary: '#d1d5db',
					},
					row: {
						primary: '#f7f7f9',
						secondary: '#d1d5db',
						hover: '#d1d5db',
					},
				},
				button: {
					default: '#092F62',
					hover: '#0A80A0',
					disabled: '#EAEBF0',
					textdisabled: '#ADB2C2',
				},
			},
		},
	},
	plugins: [require('flowbite/plugin')({ charts: true })],
};
export default config;
