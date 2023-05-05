import { useApi, useAuth, useUi } from "@/hooks";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import AppShell from "@/components/publisher/AppShell";
import { IconSearch } from "@tabler/icons-react";
import { SpotlightProvider } from "@mantine/spotlight";
import { spootlightActions } from "@/core/navbar";


const PublisherLayout = ({ children }: any) => {
	const ui = useUi();
	const api = useApi();
	const auth = useAuth();
	const router = useRouter();

	const isFirstInit = useRef(true);

	useEffect(() => {
		if (!auth.isLoggedin && !isFirstInit.current) {
			ui.messages.set({
				type: "error",
				message: "Your session has timed out. Please log in again.",
			});

			router.replace({
				pathname: "/publisher/auth/login",
				query: { redirect: router.pathname },
			});
		}

		isFirstInit.current = false;
	}, [auth.isLoggedin]);

	useEffect(() => {
		if (auth.isLoggedin) {
			api.account
				.info()
				.then((response) => {
					auth.setUser(response.data);
					ui.setAuthLoading(false);
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			router.replace({
				pathname: "/publisher/auth/login",
				query: { redirect: router.pathname },
			});
		}
	}, []);

	if (!auth.isLoggedin) {
		return null;
	}

	return (
		<SpotlightProvider actions={spootlightActions} searchIcon={<IconSearch size="1.2rem" />} searchPlaceholder="Search..." shortcut="mod + K" nothingFoundMessage="Nothing found...">
			<AppShell>{children}</AppShell>
		</SpotlightProvider>
	);
};

export default PublisherLayout;
