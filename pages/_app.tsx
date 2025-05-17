'use client';

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../layout/Layout';
import Web3ModalProvider from '@components/Web3Modal';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from '../redux/redux.store';
import BlockUpdater from '@components/BlockUpdater';
import { PONDER_CLIENT } from '../app.config';
import { ApolloProvider } from '@apollo/client';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ReduxProvider store={store}>
			<Web3ModalProvider>
				<ApolloProvider client={PONDER_CLIENT}>
					<BlockUpdater>
						<ToastContainer
							toastClassName={() =>
								'flex flex-row items-center justify-center bg-card-content-primary text-text-primary bg-opacity-100 rounded-lg shadow-lg m-2 px-4 py-4 gap-4 max-w-sm break-words whitespace-pre-line'
							}
							position="bottom-right"
							autoClose={5000}
							hideProgressBar={true}
							newestOnTop={false}
							closeOnClick={false}
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="light"
						/>

						<Layout>
							<Component {...pageProps} />
						</Layout>
					</BlockUpdater>
				</ApolloProvider>
			</Web3ModalProvider>
		</ReduxProvider>
	);
}
