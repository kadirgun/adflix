import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import RouterTransition from "@/components/RouterTransition";
import CreateLinkModal from "@/components/publisher/CreateLinkModal";
import { useUi } from "@/hooks";
import EditLinkModal from "@/components/publisher/EditLinkModal";

const Provider = ({ children }: any) => {
	const ui = useUi();

	return (
		<ColorSchemeProvider colorScheme={ui.preferredColorScheme} toggleColorScheme={ui.toggleColorScheme}>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: ui.preferredColorScheme,
					focusRing: "never",
				}}
			>
				<ModalsProvider modals={{ createLink: CreateLinkModal, editLink: EditLinkModal }}>
					<RouterTransition />
					<Notifications position="top-right" />
					{children}
				</ModalsProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
};

export default Provider;
