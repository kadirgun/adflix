import { isURL } from "@/helpers/validator";
import { useApi } from "@/hooks";
import { Button, Checkbox, Divider, Grid, PasswordInput, Stack, Text, TextInput, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconLink, IconLock, IconLockOpen } from "@tabler/icons-react";
import { useCallback, useState } from "react";

const labelStyle = {
	label: { paddingLeft: rem(8) },
};

const CreateLinkModal = ({ context, id, innerProps }: ContextModalProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [isProtected, setIsProtected] = useState<boolean>(false);

  const api = useApi();

	const form = useForm({
		initialValues: {
			target: "",
			excludes: [] as any[],
			password: "",
		},

		validate: {
			target: (value) => isURL(value, "The URL you entered is not valid."),
			password: (value) => (isProtected && !value ? "Please enter the password." : null),
		},
	});

	const handleCloseModal = () => {
		context.closeContextModal(id);
	};

	const handleProtectChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setIsProtected(event.currentTarget.checked);
			form.setFieldValue("password", "");
		},
		[isProtected]
	);

	const handleExcludesChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const excluded = parseInt(event.currentTarget.value);
			if (!form.values.excludes.includes(excluded)) {
				form.setFieldValue("excludes", [...form.values.excludes, excluded]);
			} else {
				form.setFieldValue(
					"excludes",
					form.values.excludes.filter((item) => item !== excluded)
				);
			}
		},
		[form.values]
	);

	const handleSubmit = useCallback(() => {
		setLoading(true);
    api.links
			.create(form.values)
			.then((response) => {
				console.log(response.data)
        notifications.show({
          title: 'Link Created',
          message: "Bu mesajdan sonra linke özel rapor sayfasına yönlendireceğim.",
          color: "green",
        })
        handleCloseModal();
			})
			.catch((error) => {
				if (error?.response?.data?.errors) {
					form.setErrors(error.response.data.errors);
				} else if (error?.response?.data?.error) {
          notifications.show({
            title: 'Error!',
            message: error.response.data.error,
            color: "red",
          })
				} else {
          notifications.show({
            title: 'Error!',
            message: "Something went wrong, please try again later.",
            color: "red",
          })
				}
			})
			.finally(() => {
				setLoading(false);
			});
	}, [form.values]);

	return (
		<form onSubmit={form.onSubmit(() => handleSubmit())}>
			<Divider mb="xs" opacity={0.3} />
			<Stack>
				<TextInput
					required
					data-autofocus
					label="Target URL"
					placeholder="Enter the URL you want to monetize."
					value={form.values.target}
					onChange={(event) => form.setFieldValue("target", event.currentTarget.value)}
					error={form.errors.target}
					labelProps={{
						mb: "xs",
					}}
					disabled={loading}
					icon={<IconLink size="1rem" />}
				/>

				<Checkbox color="red" label="This URL is password-protected." mb={isProtected ? 0 : "xs"} styles={labelStyle} checked={isProtected} onChange={handleProtectChange} disabled={loading} />

				{isProtected && (
					<PasswordInput
						required
						label="Access Password"
						placeholder="Enter access password"
						value={form.values.password}
						onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
						error={form.errors.password}
						labelProps={{
							mb: "xs",
						}}
						disabled={loading}
						icon={<IconLock size="1rem" />}
						autoComplete="new-password"
						mb="xs"
					/>
				)}

				<Divider label="Allowed Ad Categories" labelPosition="center" />

				<Grid columns={3} grow>
					<Grid.Col span={1}>
						<Checkbox value={0} onChange={handleExcludesChange} color="green" label="Erotic" styles={labelStyle} checked={!form.values.excludes.includes(0)} disabled={loading} />
					</Grid.Col>
					<Grid.Col span={1}>
						<Checkbox value={1} onChange={handleExcludesChange} color="green" label="Gambling" styles={labelStyle} checked={!form.values.excludes.includes(1)} disabled={loading} />
					</Grid.Col>
					<Grid.Col span={1}>
						<Checkbox value={2} onChange={handleExcludesChange} color="green" label="Software" styles={labelStyle} checked={!form.values.excludes.includes(2)} disabled={loading} />
					</Grid.Col>
				</Grid>

				<Text c="dimmed" fz="sm">
					The more ad categories you allow, the higher CPM you will get.
				</Text>

				<Grid columns={3} grow mt="sm">
					<Grid.Col span={1}>
						<Button type="reset" color="gray" fullWidth onClick={handleCloseModal} disabled={loading}>
							Cancel
						</Button>
					</Grid.Col>
					<Grid.Col span={2}>
						<Button type="submit" variant="gradient" fullWidth loading={loading}>
							{loading ? "Processing..." : "Continue"}
						</Button>
					</Grid.Col>
				</Grid>
			</Stack>
		</form>
	);
};

export default CreateLinkModal;
