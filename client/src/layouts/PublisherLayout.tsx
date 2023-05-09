import { useApi, useAuth, useUi } from "@/hooks";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import AppShell from "@/components/publisher/AppShell";
import { IconSearch } from "@tabler/icons-react";
import { SpotlightProvider } from "@mantine/spotlight";
import { spootlightActions } from "@/core/navbar";
import useConfig from "@/hooks/useConfig";
import { batch } from "react-redux";

const PublisherLayout = ({ children }: any) => {
	const api = useApi();
	const auth = useAuth();
	const ui = useUi();
	const config = useConfig();
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
			(async () => {
				const account = await api.account.info().catch((error) => null);
				if (!account?.data?.email) return;
				const appConfig = await api.config().catch((error) => null);
				if (!appConfig?.data?.domains) return;
				auth.setUser(account.data);
				config.setDomains(appConfig.data.domains);
				config.setAdCategories(appConfig.data.ad_categories);
				ui.setAuthLoading(false);
			})();
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
		<SpotlightProvider actions={spootlightActions} searchIcon={<IconSearch size="1.2rem" />} searchPlaceholder="Search..." shortcut="/" nothingFoundMessage="Nothing found...">
			<AppShell>{children}</AppShell>
		</SpotlightProvider>
	);
};

export default PublisherLayout;
