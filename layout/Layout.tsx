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
			</Head>

			{isHome ? (
				<div className="h-main pt-32 max-md:pt-20">
					<main className="block w-full min-h-content p-4 xl:px-20">{children}</main>
				</div>
			) : (
				<>
					<MenuBar />

					<div className="h-main pt-32 max-md:pt-20">
						<main className="block w-full min-h-content p-4 xl:px-20">{children}</main>

						<div className="pb-1">
							<Footer />
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Layout;
