import Head from 'next/head';
import { ReactNode } from 'react';
import Footer from './Footer';
import MenuBar from './MenuBar';
import { usePathname } from 'next/navigation';

type LayoutProps = {
	children: NonNullable<ReactNode>;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const pathname = usePathname();
	const isHome = pathname.split('/')[1] == '__home';

	return (
		<>
			<Head>
				<title>WrytLabs - Home</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
				<meta name="theme-color" content="#000000" />
				<link rel="manifest" href="/manifest.json" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black" />
			</Head>

			{isHome ? (
				<div className="h-main pt-32 max-md:pt-20">
					<main className="block w-full min-h-[100%] p-4 xl:px-20">{children}</main>
				</div>
			) : (
				<>
					<MenuBar />

					<div className="h-main pt-32 max-md:pt-20">
						<main className="block w-full min-h-[100%] p-4 xl:px-20">{children}</main>

						<div className="py-6">
							<Footer />
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Layout;
