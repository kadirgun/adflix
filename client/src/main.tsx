import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./slices/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<App />
		</ReduxProvider>
	</React.StrictMode>
);
