'use client';

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../layout/Layout';
import Web3ModalProvider from '@components/Web3Modal';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from '../redux/redux.store';
import BlockUpdater from '@components/BlockUpdater';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ReduxProvider store={store}>
			<Web3ModalProvider>
				<BlockUpdater>
					<ToastContainer position="bottom-right" hideProgressBar={false} rtl={false} theme="light" />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</BlockUpdater>
			</Web3ModalProvider>
		</ReduxProvider>
	);
}
