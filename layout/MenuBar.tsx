import { useState } from 'react';
import NavBar from './NavBar';
import WalletConnect from '@components/WalletConnect';

export default function MenuBar() {
	const [isNavBarOpen, setIsNavBarOpen] = useState<boolean>(false);

	return (
		<>
			<div className="fixed top-0 left-0 right-0 z-10 mx-2 my-4 md:m-6 md:mx-10 xl:mx-20">
				<div className="backdrop-blur bg-card-body-primary border-b-2 border-menu-separator rounded-3xl shadow-lg px-6 xl:px-10 flex items-center">
					<div className="flex items-center space-x-4 w-full">
						<div onClick={() => setIsNavBarOpen(!isNavBarOpen)} className={`cursor-pointer md:p-5 p-3`}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="w-8 h-8"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</div>

						<div className="flex flex-1 justify-end">
							<WalletConnect />
						</div>
					</div>
				</div>
			</div>

			{isNavBarOpen ? <NavBar isNavBarOpen={isNavBarOpen} setIsNavBarOpen={setIsNavBarOpen} /> : null}
		</>
	);
}
