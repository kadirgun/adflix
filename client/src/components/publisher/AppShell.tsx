import React, { useCallback, useState } from "react";
import { AppShell as MantineAppShell, Header, Group, ActionIcon, useMantineColorScheme, rem, Tooltip } from "@mantine/core";
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand, IconMoon, IconSun } from "@tabler/icons-react";
import Navbar from "@/components/publisher/Navbar";
import Logo from "@/components/Logo";
import { useUi } from "@/hooks";
import { useColorScheme } from "@mantine/hooks";

const AppShell = ({ children }: any) => {
	const ui = useUi();
	const colorScheme = ui?.colorScheme || useColorScheme();
	const [sidebar, setSidebar] = useState<boolean>(true);
	const dark = colorScheme === "dark";

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
									<Tooltip label="Hide menu">
										<IconLayoutSidebarLeftCollapse size="1.20rem" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
									</Tooltip>
								) : (
									<Tooltip label="Show menu">
										<IconLayoutSidebarLeftExpand size="1.20rem" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
									</Tooltip>
								)}
							</ActionIcon>

							<ActionIcon variant="default" size="2rem" radius="md" onClick={() => ui.setColorScheme(colorScheme === "dark" ? "light" : "dark")}>
								{dark ? (
									<Tooltip label="Disable dark mode">
										<IconSun size="1.20rem" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
									</Tooltip>
								) : (
									<Tooltip label="Enable dark mode">
										<IconMoon size="1.20rem" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
									</Tooltip>
								)}
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
