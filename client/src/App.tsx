import { MantineProvider, ColorScheme, ColorSchemeProvider } from "@mantine/core";
import { useColorScheme, useHotkeys } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { NavigationProgress } from "@mantine/nprogress";
import AppRouter from "./AppRouter";
import { ModalsProvider } from "@mantine/modals";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./slices/store";
import { UIActions } from "./slices/ui";

const App = () => {
	const ui = useAppSelector((state) => state.ui);
	const preferredColorScheme = ui?.colorScheme || useColorScheme();
	const dispatch = useDispatch();

	const toggleColorScheme = (value?: ColorScheme) => {
		dispatch(UIActions.setColorScheme(value || (preferredColorScheme === "dark" ? "light" : "dark")));
	};

	useHotkeys([["mod+J", () => toggleColorScheme()]]);

	return (
		<ColorSchemeProvider colorScheme={preferredColorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: preferredColorScheme,
				}}
			>
				<ModalsProvider>
					<NavigationProgress />
					<Notifications position="top-right" />
					<RouterProvider router={AppRouter} />
				</ModalsProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
};

export default App;
