import React, { useCallback, useState } from "react";
import { AppShell as MantineAppShell, Header, Group, ActionIcon, rem, Tooltip } from "@mantine/core";
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand, IconMoon, IconSun } from "@tabler/icons-react";
import Navbar from "@/components/publisher/Navbar";
import Logo from "@/components/Logo";
import { useUi } from "@/hooks";

const AppShell = ({ children }: any) => {
	const ui = useUi();
	const [sidebar, setSidebar] = useState<boolean>(true);

	const toggleSideBar = useCallback(() => {
		setSidebar(!sidebar);
	}, [sidebar]);

	return (
		<MantineAppShell
			padding="md"
			navbar={sidebar ? <Navbar /> : <></>}
			header={
				<Header height={rem(60)}>
					<Group sx={{ height: "100%", width: "100%" }} px={20} position="apart">
						<Logo width={rem(110)} />

						<Group position={"right"}>
							<ActionIcon variant="default" size="2rem" radius="md" onClick={toggleSideBar}>
								{sidebar ? (
									<IconLayoutSidebarLeftCollapse size="1.20rem" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
								) : (
									<IconLayoutSidebarLeftExpand size="1.20rem" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
								)}
							</ActionIcon>

							<ActionIcon
								variant="default"
								size="2rem"
								radius="md"
								onClick={ui.toggleColorScheme}
								sx={(theme) => ({
									color: theme.colorScheme === "dark" ? theme.colors.yellow[4] : theme.colors.blue[6],
								})}
							>
								{ui.colorScheme === "dark" ? <IconSun size="1.20rem" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /> : <IconMoon size="1.20rem" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />}
							</ActionIcon>
						</Group>
					</Group>
				</Header>
			}
			styles={(theme) => ({
				main: { backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0] },
			})}
		>
			{children}
		</MantineAppShell>
	);
};

export default AppShell;
