import { IconCheck, IconClick, IconClock, IconCopy, IconCurrencyDollar, IconEdit, IconEye, IconHeart, IconKeyOff, IconLink, IconLockOpen, IconTrash } from "@tabler/icons-react";
import { Card, Image, Text, Group, Badge, Button, ActionIcon, createStyles, rem, Avatar, Chip, Grid, Input, CopyButton, Tooltip, Box, Popover, Kbd, TextInput, SimpleGrid, Paper } from "@mantine/core";
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
	label: {
		textTransform: "uppercase",
		fontSize: theme.fontSizes.xs,
		fontWeight: 700,
	},
	shortLink: {
		flex: 1,
	},
	shortLinkText: {
		display: "flex",
		alignItems: "center",
		height: "100%",
	},

	statIcon: {
		color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4],
	},
}));

const icons = {
	click: IconClick,
	earnings: IconCurrencyDollar,
} as any;

const LinkCard = ({ value }: ILinkCardProps) => {
	const { clicks, created_at, domain, earnings, excludes, favicon, id, key, name, password, target, type, updated_at } = value;
	const { classes, theme } = useStyles();
	const config = useConfig();
	const shortUrl = `https://${config.domains.find((item) => item.id === domain)?.name}/${key}`;

	const data = [
		{
			title: "Clicks",
			value: clicks,
			icon: "click",
		},
		{
			title: "Earnings",
			value: `$${earnings.toFixed(2)}`,
			icon: "earnings",
		},
	];

	const stats = data.map((item) => {
		const Icon = icons[item.icon];

		return (
			<Paper withBorder p="sm" key={item.title}>
				<Group position="apart">
					<Text transform="uppercase" color="dimmed" size="xs" fw="bold">
						{item.title}
					</Text>
					<Text lh={1} size="sm" fw="bold">{item.value}</Text>
				</Group>
			</Paper>
		);
	});

	return (
		<Card withBorder radius="md" p="md" className={classes.card}>
			<Card.Section className={classes.section} mt="md">
				<Group mt="md" spacing="xs">
					<Avatar src={"https://s.mynet.com.tr/favicons/favicon-32x32.png"} size={24} radius="xl" />
					<Box w="calc(100% - 3rem)">
						<Text fz="md" fw={500} truncate>
							Mynet | Haber, Oyun, Video, Spor, Burçlar ve fazlası sizin için burad
						</Text>
						<Text fz="sm" c="dimmed" truncate>
							{target}
						</Text>
					</Box>
				</Group>
			</Card.Section>

			<Card.Section my="md" className={classes.section}>
				<SimpleGrid cols={2}>{stats}</SimpleGrid>
			</Card.Section>

			<Card.Section className={classes.section}>
				<Text mb="sm" className={classes.label} c="dimmed">
					Ad Categories
				</Text>
				<Group spacing={7} mt={5}>
					{config.ads_types.map((type) => (
						<Chip disabled={!excludes.includes(type.id)} color="green" variant="light" checked={excludes.includes(type.id)} key={type.label}>
							{type.label}
						</Chip>
					))}
				</Group>
			</Card.Section>

			<Grid mt="xs">
				<Grid.Col>
					<Group>
						<Input
							icon={<IconLink size={18} />}
							rightSection={
								<CopyButton value={shortUrl} timeout={2000}>
									{({ copied, copy }) => (
										<Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
											<ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
												{copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
											</ActionIcon>
										</Tooltip>
									)}
								</CopyButton>
							}
							className={classes.shortLink}
							variant="filled"
							component="span"
						>
							<Text color="dimmed" className={classes.shortLinkText}>
								{shortUrl}
							</Text>
						</Input>

						{password && (
							<Popover position="bottom" withArrow shadow="md" withinPortal>
								<Popover.Target>
									<Tooltip label="Show access password">
										<ActionIcon variant="default" size={36} c="dimmed">
											<IconLockOpen size="1.20rem" />
										</ActionIcon>
									</Tooltip>
								</Popover.Target>
								<Popover.Dropdown>
									<TextInput
										icon={<IconLockOpen size={18} />}
										rightSection={
											<CopyButton value={password} timeout={2000}>
												{({ copied, copy }) => (
													<Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
														<ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
															{copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
														</ActionIcon>
													</Tooltip>
												)}
											</CopyButton>
										}
										className={classes.shortLink}
										variant="filled"
										defaultValue={password}
										label="Access Password"
										labelProps={{
											mb: "xs",
										}}
										readOnly
									/>
								</Popover.Dropdown>
							</Popover>
						)}
					</Group>
				</Grid.Col>

				<Grid.Col mt="xs">
					<Grid>
						<Grid.Col span={6}>
							<Button variant="light" color={theme.colors.blue[5]}>
								<Group spacing={rem(6)}>
									<IconEye size="1.20rem" color={theme.colors.blue[5]} />
									<Text color={theme.colors.blue[5]}>Details</Text>
								</Group>
							</Button>
						</Grid.Col>
						<Grid.Col span={6}>
							<Group position="right">
								<ActionIcon variant="default" size={36}>
									<IconEdit size="1.20rem" color={theme.colors.blue[5]} />
								</ActionIcon>
								<ActionIcon variant="default" size={36}>
									<IconTrash size="1.20rem" color={theme.colors.red[5]} />
								</ActionIcon>
							</Group>
						</Grid.Col>
					</Grid>
				</Grid.Col>
			</Grid>
		</Card>
	);
};

export default LinkCard;
