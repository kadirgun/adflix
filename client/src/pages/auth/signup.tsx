import Link from "next/link";

import { useForm, isEmail, isNotEmpty, matchesField } from "@mantine/form";
import { TextInput, PasswordInput, Text, Paper, PaperProps, Button, Anchor, Stack, Container, Title, Box, Checkbox, Group, rem } from "@mantine/core";
import { useCallback, useState } from "react";
import ErrorMessages from "../../components/ErrorMessages";
import { IErrorMessageResponse } from "../../components/types";
import { useApi } from "../../hooks";
import { useDispatch } from "react-redux";
import { UserActions } from "../../slices/user";
import { IconAt, IconLock } from "@tabler/icons-react";
import Head from "next/head";

const Signup = (props: PaperProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<IErrorMessageResponse>();
	const dispatch = useDispatch();

	const api = useApi();

	const form = useForm({
		initialValues: {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			password_confirmation: "",
			terms_accepted: false,
		},

		validate: {
			first_name: isNotEmpty("First name field is required"),
			last_name: isNotEmpty("Last name field is required"),
			email: isEmail("Invalid email address"),
			password: isNotEmpty("Password field is required"),
			password_confirmation: matchesField("password", "Passwords are not the same"),
			terms_accepted: (value) => value !== true && "You must accept terms and conditions",
		},
	});

	const handleSubmit = useCallback(() => {
		setErrors(undefined);
		setLoading(true);
		api.auth
			.register(form.values)
			.then((response) => {
				dispatch(UserActions.setAccessToken(response.data.access_token));
				dispatch(UserActions.setLoggedin(true));
			})
			.catch((error) => {
				if (error?.response?.data?.errors) {
					setErrors(error.response.data.errors);
				} else {
					setErrors({ bad_request: "Something went wrong, please try again later." });
				}
			})
			.finally(() => {
				setLoading(false);
			});
	}, [form.values]);

	return (
		<>
			<Head>
				<title>Signup - Adflix</title>
			</Head>
			<Container size="xs" mt={rem(120)}>
				<Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
					Create Account
				</Title>
				<Text color="dimmed" size="sm" align="center" mt={5}>
					Do you already have an account?{" "}
					<Link href="/auth/login">
						<Anchor size="sm" component="button">
							Login
						</Anchor>
					</Link>
				</Text>
				<Paper p="xl" mt={30} withBorder {...props}>
					{errors && (
						<Box mb={"lg"}>
							<ErrorMessages messages={errors} />
						</Box>
					)}

					<form onSubmit={form.onSubmit(() => handleSubmit())}>
						<Stack>
							<Group position="apart" grow>
								<TextInput
									required
									label="First Name"
									placeholder="Your first name"
									value={form.values.first_name}
									onChange={(event) => form.setFieldValue("first_name", event.currentTarget.value)}
									error={form.errors.name}
									labelProps={{
										mb: "xs",
									}}
									mb="xs"
									disabled={loading}
								/>

								<TextInput
									required
									label="Last Name"
									placeholder="Your last name"
									value={form.values.last_name}
									onChange={(event) => form.setFieldValue("last_name", event.currentTarget.value)}
									error={form.errors.name}
									labelProps={{
										mb: "xs",
									}}
									mb="xs"
									disabled={loading}
								/>
							</Group>
							<TextInput
								required
								label="Email"
								placeholder="Enter your email address"
								value={form.values.email}
								onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
								error={form.errors.email}
								labelProps={{
									mb: "xs",
								}}
								mb="xs"
								disabled={loading}
								icon={<IconAt size="1rem" />}
							/>

							<PasswordInput
								required
								label="Password"
								placeholder="Create a password"
								value={form.values.password}
								onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
								error={form.errors.password || form.errors.password_confirmation}
								labelProps={{
									mb: "xs",
								}}
								mb="xs"
								disabled={loading}
								icon={<IconLock size="1rem" />}
							/>
							<PasswordInput
								required
								label="Confirm Password"
								placeholder="Confirm your password"
								value={form.values.password_confirmation}
								onChange={(event) => form.setFieldValue("password_confirmation", event.currentTarget.value)}
								error={form.errors.password_confirmation}
								labelProps={{
									mb: "xs",
								}}
								mb="xs"
								disabled={loading}
								icon={<IconLock size="1rem" />}
							/>

							<Checkbox
								label="I have read and agree to the terms and conditions."
								checked={form.values.terms_accepted}
								onChange={(event) => form.setFieldValue("terms_accepted", event.currentTarget.checked)}
								error={form.errors.terms_accepted}
								mb="xs"
								disabled={loading}
							/>
						</Stack>

						<Button fullWidth mt="xl" type="submit" loading={loading}>
							Signup
						</Button>
					</form>
				</Paper>
				<Group position="center" mt={rem(45)}>
					<Link href="/">
						<Anchor component="button" size="sm">
							Back to home page
						</Anchor>
					</Link>
				</Group>
			</Container>
		</>
	);
};

export default Signup;
