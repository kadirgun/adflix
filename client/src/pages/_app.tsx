import { AppProps } from "next/app";
import Head from "next/head";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/slices/store";
import Provider from "./_provider";
import { AppPropsWithLayout } from "./types";

const App = (props: AppPropsWithLayout) => {
	const { Component, pageProps } = props;
	const getLayout = Component.getLayout || ((page) => page);
	return (
		<>
			<ReduxProvider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Head>
						<title>Adflix</title>
						<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
					</Head>
					<Provider>
						{getLayout(<Component {...pageProps} />)}
					</Provider>
				</PersistGate>
			</ReduxProvider>
		</>
	);
}

App.getInitialProps = async ({ Component, router }: AppProps) => {
	console.log(router);

	return {}
}

export default App;
