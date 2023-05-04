import { useApi, useAuth, useUi } from "@/hooks";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import AppShell from "@/components/publisher/AppShell";

const PublisherLayout = ({ children }: any) => {
	const ui = useUi();
	const api = useApi();
	const auth = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!auth.isLoggedin) {
			router.replace({
				pathname: "/publisher/auth/login",
				query: { redirected_from: router.pathname },
			});
		}
	}, [auth.isLoggedin, auth.account]);

	useEffect(() => {
		if (auth.isLoggedin) {
			api.account
				.info()
				.then((response) => {
					auth.setUser(response.data);
					ui.setAuthLoading(false);
				})
				.catch((error) => null);
		}
	}, []);

	if (!auth.isLoggedin) {
		return null;
	}

	return <AppShell>{children}</AppShell>;
};

export default PublisherLayout;
