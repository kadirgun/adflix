import React, { useCallback, useState } from "react";
import { AppShell as MantineAppShell, Header, Group, ActionIcon, useMantineColorScheme, rem, Tooltip } from "@mantine/core";
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand, IconMoon, IconSun } from "@tabler/icons-react";
import Navbar from "@/components/publisher/Navbar";
import Logo from "@/components/Logo";

const AppShell = ({ children }: any) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
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
				<Header height={rem(60)} p="xs">
					<Group sx={{ height: "100%", width: "100%" }} px={20} position="apart">
						<Logo width={rem(120)} />

						<Group position={"right"}>
							<ActionIcon variant="default" size="lg" radius="md" onClick={toggleSideBar}>
								{sidebar ? (
									<Tooltip label="Hide menu">
										<IconLayoutSidebarLeftCollapse size="1.375rem" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
									</Tooltip>
								) : (
									<Tooltip label="Show menu">
										<IconLayoutSidebarLeftExpand size="1.375rem" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
									</Tooltip>
								)}
							</ActionIcon>

							<ActionIcon variant="default" size="lg" radius="md" onClick={() => toggleColorScheme()}>
								{dark ? (
									<Tooltip label="Disable dark mode">
										<IconSun size="1.375rem" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
									</Tooltip>
								) : (
									<Tooltip label="Enable dark mode">
										<IconMoon size="1.375rem" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
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
