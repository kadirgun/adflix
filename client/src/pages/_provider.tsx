import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { UIActions } from "@/slices/ui";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/slices/store";
import RouterTransition from "@/components/RouterTransition";
import CreateLinkModal from "@/components/publisher/CreateLinkModal";

const Provider = ({ children }: any) => {
	const ui = useAppSelector((state) => state.ui);
	const preferredColorScheme = ui?.colorScheme || useColorScheme();
	const dispatch = useDispatch();

	const toggleColorScheme = (value?: ColorScheme) => {
		dispatch(UIActions.setColorScheme(value || (preferredColorScheme === "dark" ? "light" : "dark")));
	};

	return (
		<ColorSchemeProvider colorScheme={preferredColorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: preferredColorScheme,
					focusRing: "never"
				}}
			>
				<ModalsProvider modals={{ createLink: CreateLinkModal }}>
					<RouterTransition />
					<Notifications position="top-right" />
					{children}
				</ModalsProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
};

export default Provider;
