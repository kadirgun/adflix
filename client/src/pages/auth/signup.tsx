import Link from "next/link";

import { useForm, isEmail, isNotEmpty } from "@mantine/form";
import { TextInput, PasswordInput, Text, Paper, PaperProps, Button, Anchor, Stack, Container, Title, Box } from "@mantine/core";
import { useCallback, useState } from "react";
import ErrorMessages from "../../components/ErrorMessages";
import { IErrorMessageResponse } from "../../components/types";
import { useApi } from "../../hooks";
import { useDispatch } from "react-redux";
import { UserActions } from "../../slices/user";

const Signup = (props: PaperProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<IErrorMessageResponse>();
	const dispatch = useDispatch();

	const api = useApi();

	const form = useForm({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},

		validate: {
			name: isNotEmpty("Full Name is required"),
			email: isEmail("Invalid email address"),
			password: isNotEmpty("Password is required"),
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
			<Container size="xs" my={90}>
				<Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
					adflix
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
							<TextInput
								required
								label="Full Name"
								placeholder="Your full name"
								value={form.values.name}
								onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
								error={form.errors.name}
								labelProps={{
									mb: "xs",
								}}
								disabled={loading}
							/>
							<TextInput
								required
								label="Email"
								placeholder="mail@mail.com"
								value={form.values.email}
								onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
								error={form.errors.email}
								labelProps={{
									mb: "xs",
								}}
								disabled={loading}
							/>

							<PasswordInput
								required
								label="Password"
								placeholder="Your password"
								value={form.values.password}
								onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
								error={form.errors.password}
								labelProps={{
									mb: "xs",
								}}
								disabled={loading}
							/>
						</Stack>

						<Button fullWidth mt="xl" type="submit" loading={loading}>
							Signup
						</Button>
					</form>
				</Paper>
			</Container>
		</>
	);
};

export default Signup;
