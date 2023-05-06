import { useRef } from "react";
import { Navbar as MantineNavbar, ScrollArea, createStyles, rem, TextInput, Divider, Button, Flex, Kbd } from "@mantine/core";
import LinksGroup from "@/components/publisher/NavbarLinksGroup";
import UserButton from "@/components/publisher/UserButton";
import { links } from "@/core/navbar";
import { IconRocket, IconSearch } from "@tabler/icons-react";
import { useSpotlight } from "@mantine/spotlight";
import { handleCreateLink } from "@/core/modal";

const useStyles = createStyles((theme) => ({
	navbar: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
		paddingBottom: 0,
	},

	linksInner: {
		paddingTop: theme.spacing.xs,
		paddingBottom: theme.spacing.xs,
	},

	footer: {
		paddingTop: theme.spacing.xs,
	},
}));

const Navbar = () => {
	const { classes } = useStyles();
	const routerSearchRef = useRef<any>();
	const data = links.map((item) => <LinksGroup {...item} key={item.label} />);
	const spotlight = useSpotlight();

	if (spotlight.opened) {
		routerSearchRef.current?.blur();
	}

	return (
		<MantineNavbar width={{ sm: 300 }} px="xs" pb="xs" className={classes.navbar}>
			<Button size="xs" leftIcon={<IconRocket size={rem(15)} />} variant="gradient" my="md" mx="xs" onClick={handleCreateLink}>
				Create Link
			</Button>

			<TextInput
				ref={routerSearchRef}
				placeholder="Search page..."
				icon={<IconSearch size="1rem" />}
				rightSectionWidth={34}
				rightSection={
					<Flex align="center">
						<Kbd>/</Kbd>
					</Flex>
				}
				styles={{ rightSection: { pointerEvents: "none" } }}
				mb="xs"
				mx="xs"
				onFocus={() => spotlight.openSpotlight()}
			/>

			<Divider mt="xs" mx="xs" />

			<MantineNavbar.Section grow component={ScrollArea}>
				<div className={classes.linksInner}>{data}</div>
			</MantineNavbar.Section>
			<Divider my="xs" mx="xs" />
			<MantineNavbar.Section className={classes.footer}>
				<UserButton />
			</MantineNavbar.Section>
		</MantineNavbar>
	);
};

export default Navbar;
