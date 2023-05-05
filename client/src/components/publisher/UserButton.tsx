import { UnstyledButton, Group, Avatar, Text, createStyles } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useAuth } from "@/hooks";

const useStyles = createStyles((theme) => ({
	user: {
		display: "block",
		width: "100%",
		padding: theme.spacing.xs,
		color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
		borderRadius: 6,
		"&:hover": {
			backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
		}
	},
}));

const UserButton = ({ ...others }: any) => {
	const { classes } = useStyles();
	const auth = useAuth();
	return (
		<UnstyledButton className={classes.user} {...others}>
			<Group>
				{auth.account.avatar ? <Avatar src={null} radius="xl" /> : <Avatar color="blue" radius="xl">{`${auth.account.first_name?.charAt(0)}${auth.account.last_name?.charAt(0)}`}</Avatar>}

				<div style={{ flex: 1 }}>
					<Text size="sm" weight={500}>
						{auth.account.first_name} {auth.account.last_name}
					</Text>

					<Text color="dimmed" size="xs">
						{auth.account.email}
					</Text>
				</div>

				<IconChevronRight size="0.9rem" stroke={1.5} />
			</Group>
		</UnstyledButton>
	);
};

export default UserButton;
