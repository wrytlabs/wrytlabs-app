import Head from 'next/head';
import { ReactNode } from 'react';
import Footer from './Footer';
import MenuBar from './MenuBar';

type LayoutProps = {
	children: NonNullable<ReactNode>;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<Head>
				<title>WrytLabs - Home</title>
			</Head>

			<MenuBar />

			<div className="h-main pt-32 max-md:pt-28">
				<main className="block min-h-content p-4 xl:px-20">{children}</main>

				<div className="pb-1">
					<Footer />
				</div>
			</div>
		</>
	);
};

export default Layout;
