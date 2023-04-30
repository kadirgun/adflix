import { useForm, isEmail, isNotEmpty } from "@mantine/form";
import { TextInput, PasswordInput, Text, Paper, Group, PaperProps, Button, Anchor, Stack, Container, Title, Box } from "@mantine/core";
import { useState } from "react";
import ErrorMessages from "../../components/ErrorMessages";
import { IErrorMessageResponse } from "../../components/types";

const Login = (props: PaperProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<IErrorMessageResponse>();

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

	return (
		<Container size="xs" my={40}>
			<Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
				adflix
			</Title>
			<Text color="dimmed" size="sm" align="center" mt={5}>
				Do not have an account yet?{" "}
				<Anchor size="sm" component="button">
					Create account
				</Anchor>
			</Text>
			<Paper p="xl" mt={30} withBorder shadow="lg" {...props}>
				{errors && (
					<Box mb={"lg"}>
						<ErrorMessages messages={errors} />
					</Box>
				)}

				<form
					onSubmit={form.onSubmit(() => {
						setLoading(true);
						setTimeout(() => {
							setErrors({
								email: ["Email address or password is incorrect"],
							});
							setLoading(false);
						}, 1000);
						console.log(form.values);
					})}
				>
					<Stack>
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

					<Group position="apart" mt="lg">
						<div></div>
						<Anchor component="button" size="sm">
							Forgot password?
						</Anchor>
					</Group>
					<Button fullWidth mt="xl" type="submit" loading={loading}>
						Sign in
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default Login;
