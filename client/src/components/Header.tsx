import { createStyles, Header as MantineHeader, Container, Group, Button, Burger, rem, Text, Drawer, ScrollArea, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IHeaderActionProps } from "./types";

const headerHeight = rem(60);

const useStyles = createStyles((theme) => ({
	header: {
		borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
	},
	inner: {
		height: headerHeight,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},

	links: {
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},

	burger: {
		[theme.fn.largerThan("sm")]: {
			display: "none",
		},
	},

	link: {
		display: "block",
		lineHeight: 1,
		padding: `${rem(8)} ${rem(12)}`,
		borderRadius: theme.radius.sm,
		textDecoration: "none",
		color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		"&:hover": {
			backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
		},
	},

	hiddenMobile: {
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},

	hiddenDesktop: {
		[theme.fn.largerThan("sm")]: {
			display: "none",
		},
	},
}));

const Header = ({ links }: IHeaderActionProps) => {
	const { classes, theme } = useStyles();
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
	const items = links.map((link) => {
		return (
			<a key={link.label} href={link.link} className={classes.link} onClick={(event) => event.preventDefault()}>
				{link.label}
			</a>
		);
	});

	return (
		<>
			<MantineHeader height={headerHeight} className={classes.header}>
				<Container className={classes.inner} size="xl">
					<Group>
						<Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.burger} size="sm" />
						<Text>adflix</Text>
					</Group>
					<Group spacing="md" className={classes.links}>
						{items}
					</Group>
					<Group position="right" h={30}>
						<Button radius="md" variant="default">
							Login
						</Button>
						<Button radius="md">Signup</Button>
					</Group>
				</Container>
			</MantineHeader>
			<Drawer closeButtonProps={{ size: "md" }} title="Menu" opened={drawerOpened} onClose={closeDrawer}  size="xs" padding="xl" className={classes.hiddenDesktop} zIndex={1000000}>
				<ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
					<Group
						spacing="md"
						my="lg"
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "flex-start",
							alignItems: "flex-start",
						}}
					>
						{items}
					</Group>
					<Divider my="sm" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />

					<Group position="center" grow pb="xl" px="md">
						<Button radius="md" variant="default">
							Login
						</Button>
						<Button radius="md">Signup</Button>
					</Group>
				</ScrollArea>
			</Drawer>
		</>
	);
};

export default Header;
