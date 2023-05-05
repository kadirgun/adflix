import Link from "next/link";

import { useForm, isEmail, isNotEmpty } from "@mantine/form";
import { TextInput, PasswordInput, Text, Paper, Group, PaperProps, Button, Anchor, Stack, Title, Box } from "@mantine/core";
import { ReactElement, useCallback, useEffect, useState } from "react";
import ErrorMessages from "@/components/ErrorMessages";
import { IErrorMessageResponse } from "@/components/types";
import { useApi, useUi } from "@/hooks";
import { useDispatch } from "react-redux";
import { UserActions } from "@/slices/user";
import Head from "next/head";
import { IconAt, IconLock } from "@tabler/icons-react";
import AuthLayout from "@/layouts/AuthLayout";
import { useRouter } from "next/router";

const Login = (props: PaperProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<IErrorMessageResponse>();
	const dispatch = useDispatch();
	const ui = useUi();
	const router = useRouter();

	useEffect(() => {
		if (ui.messages.get().type === "error") {
			setErrors({ invalid_auth: "Your session has timed out. Please log in again." });
		}
	}, [router.query]);

	const api = useApi();

	const form = useForm({
		initialValues: {
			email: "",
			password: "",
		},

		validate: {
			email: isEmail("Invalid email address"),
			password: isNotEmpty("Password is required"),
		},
	});

	const handleSubmit = useCallback(() => {
		setErrors(undefined);
		setLoading(true);
		api.auth
			.login(form.values)
			.then((response) => {
				dispatch(UserActions.setAccessToken(response.data.access_token));
			})
			.catch((error) => {
				if (error?.response?.data?.error) {
					setErrors({ invalid_auth: error.response.data.error });
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
				<title>Login - Adflix</title>
			</Head>
			<Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
				Welcome back!
			</Title>
			<Text color="dimmed" size="sm" align="center" mt={5}>
				Do not have an account yet?{" "}
				<Link href="/publisher/auth/signup">
					<Anchor size="sm" component="button">
						Create account
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
							placeholder="Enter your password"
							value={form.values.password}
							onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
							error={form.errors.password}
							labelProps={{
								mb: "xs",
							}}
							mb="sm"
							disabled={loading}
							icon={<IconLock size="1rem" />}
						/>
					</Stack>

					<Group position="apart" mb="xs">
						<div></div>
						<Anchor component="button" size="sm">
							Forgot Password?
						</Anchor>
					</Group>
					<Button fullWidth mt="xl" type="submit" loading={loading}>
						Sign in
					</Button>
				</form>
			</Paper>
		</>
	);
};

Login.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>;
export default Login;
