import { useAuth } from "@/hooks";
import React from "react";
import { useRouter } from "next/router";
import { Group, Anchor, Container, rem } from "@mantine/core";
import Link from "next/link";

const AuthLayout = ({ children }: any) => {
	const auth = useAuth();
	const router = useRouter();
	
	if (auth.isLoggedin) {
		router.replace("/publisher/");
		return null;
	}

	return (
		<Container size="xs" my={rem(90)}>
			{children}
			<Group position="center" mt={rem(45)}>
				<Link href="/">
					<Anchor component="button" size="sm">
						Back to home page
					</Anchor>
				</Link>
			</Group>
		</Container>
	);
};

export default AuthLayout;
