import { IconCheck, IconClick, IconCopy, IconCurrencyDollar, IconEdit, IconLink, IconLockOpen, IconLockOpenOff, IconTrash } from "@tabler/icons-react";
import { Card, Text, Group, Badge, ActionIcon, createStyles, rem, Avatar, Chip, Grid, Input, CopyButton, Tooltip, Box, Popover, Kbd, TextInput, SimpleGrid, Menu, Flex, Anchor, Divider } from "@mantine/core";
import { ILinkCardProps } from "../types";
import useConfig from "@/hooks/useConfig";
import { IconDotsVertical } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
	shortLink: {
		flex: 1,
	},
	shortLinkText: {
		display: "flex",
		alignItems: "center",
		height: "100%",
	},
	actionIcon: {
		position: "absolute",
		right: rem(8),
		top: rem(8),
	},
	stat: {
		borderBottom: `${rem(2)} solid`,
		paddingBottom: rem(8),
	},
	anchorHover: {
		"&:hover": {
			opacity: 0.6,
			transition: "opacity 200ms ease",
		},
	},
}));

const icons = {
	click: IconClick,
	earnings: IconCurrencyDollar,
} as any;

const LinkCard = ({ value }: ILinkCardProps) => {
	const { clicks, domain, earnings, excludes, key, name, password, target } = value;
	const { classes } = useStyles();
	const config = useConfig();
	const shortUrl = `https://${config.domains.find((item) => item.id === domain)?.name}/${key}`;
	const favicon = `https://icon.horse/icon/?size=small&uri=${target}`;

	return (
		<Card shadow="sm">
			<Card.Section py="md" px="md">
				<Grid gutter={0} align="flex-start">
					<Grid.Col span={10}>
						<Flex gap="xs" align={"flex-start"}>
							<Avatar src={favicon} radius="sm" size={32} />
							<Box maw="95%">
								<Anchor href={target} underline={false} target="_blank" rel="noopener noreferrer" className={classes.anchorHover}>
									<Text lh={1} fz="md" fw={500} truncate>
										{name || key}
									</Text>
									<Text fz="sm" c="dimmed" truncate>
										{target}
									</Text>
								</Anchor>
							</Box>
						</Flex>
					</Grid.Col>
					<Grid.Col span={2} className={classes.actionIcon}>
						<Menu position="bottom-end" shadow="sm">
							<Menu.Target>
								<ActionIcon radius="xl">
									<IconDotsVertical size="1.1rem" />
								</ActionIcon>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item icon={<IconEdit size={rem(14)} />} color="blue">
									Edit
								</Menu.Item>
								<Menu.Item icon={<IconTrash size={rem(14)} />} color="red">
									Delete
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Grid.Col>
				</Grid>
			</Card.Section>

			<Card.Section pb="lg" px="md">
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
										<IconLockOpenOff size="1.20rem" />
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
			</Card.Section>

			<Card.Section pb="lg" px="md">
				<SimpleGrid cols={2} c="dimmed">
					<Box className={classes.stat}>
						<Group position="apart" align="flex-end" spacing="xs" px={2}>
							<Text size="sm" fw={700}>
								Clicks
							</Text>
							<Badge fz="xs">{clicks}</Badge>
						</Group>
					</Box>
					<Box className={classes.stat}>
						<Group position="apart" align="flex-end" spacing={0} px={2}>
							<Text size="sm" fw={700}>
								Earnings
							</Text>
							<Badge fz="xs">${earnings.toFixed(2)}</Badge>
						</Group>
					</Box>
				</SimpleGrid>
			</Card.Section>

			<Card.Section px="md" pb="md">
				<Divider
					label="Ad Categories"
					c={"dimmed"}
					labelProps={{
						fz: "sm",
					}}
					labelPosition="center"
					mb="md"
				/>
				<Group spacing={7} mt={5} position="center">
					{config.ads_types.map((type) => (
						<Chip disabled={excludes.includes(type.id)} color="green" variant="light" checked={!excludes.includes(type.id)} key={type.label}>
							{type.label}
						</Chip>
					))}
				</Group>
			</Card.Section>
		</Card>
	);
};

export default LinkCard;
