import { Code, KbdProps, createStyles } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
	code: {
		fontWeight: 600,
		fontSize: 10,
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
		border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]}`,
	},
}));

const KeyboardShortcut = ({ children }: KbdProps) => {
	const { classes } = useStyles();
	return <Code className={classes.code}>{children}</Code>;
};

export default KeyboardShortcut;
