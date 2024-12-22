'use client';

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="font-sans px-0 md:px-8 max-w-screen-2xl container-xl mx-auto bg-layout-primary text-text-primary">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
