import { IconCheck, IconHeart } from "@tabler/icons-react";
import { Card, Image, Text, Group, Badge, Button, ActionIcon, createStyles, rem, Avatar } from "@mantine/core";
import { ILinkCardProps } from "../types";
import useConfig from "@/hooks/useConfig";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
	},

	section: {
		borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		paddingBottom: theme.spacing.md,
	},

	like: {
		color: theme.colors.red[6],
	},

	label: {
		textTransform: "uppercase",
		fontSize: theme.fontSizes.xs,
		fontWeight: 700,
	},
}));

const LinkCard = ({ value }: ILinkCardProps) => {
	const { clicks, created_at, domain, earnings, excludes, favicon, id, key, name, password, target, type, updated_at } = value;
	const { classes, theme } = useStyles();
	const config = useConfig();

	return (
		<Card withBorder radius="md" p="md" className={classes.card}>
			<Card.Section className={classes.section} mt="md">
				<Group mt="md" spacing="xs">
        <Avatar src={"https://s.mynet.com.tr/favicons/favicon-32x32.png"} size={18} radius="xl" />
				<Text fz="md" fw={500} truncate w="calc(100% - 2.5rem)">
					Google HD Yayından İzleme Sitesiiiiiiiiiiiiiiiiiiiiiiissssssssssssssss
				</Text>
          </Group>
        
				<Text fz="sm" mt="xl">
					description alanı burası
				</Text>
			</Card.Section>

			<Card.Section className={classes.section}>
				<Text my="md" className={classes.label} c="dimmed">
        Ad Categories
				</Text>
				<Group spacing={7} mt={5}>
					{config.ads_types.map((type) => (
    <Badge
      color={excludes.includes(type.id) ? "red" : "green"}
      
      key={type.label}
    >
      {type.label}
    </Badge>
  ))}
				</Group>
			</Card.Section>

			<Group mt="xs">
				<Button radius="md" style={{ flex: 1 }}>
					Show details
				</Button>
				<ActionIcon variant="default" radius="md" size={36}>
					<IconHeart size="1.1rem" className={classes.like} stroke={1.5} />
				</ActionIcon>
			</Group>
		</Card>
	);
};

export default LinkCard;
