import { isURL } from "@/helpers/validator";
import { useApi } from "@/hooks";
import useConfig from "@/hooks/useConfig";
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconLink, IconLock, IconWorldWww } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Link } from "../types";

const labelStyle = {
  label: { paddingLeft: rem(8) },
};

const EditLinkModal = ({ context, id, innerProps }: ContextModalProps) => {
  const value = innerProps as Link;
  const [loading, setLoading] = useState<boolean>(false);
  const [isProtected, setIsProtected] = useState<boolean>(value.password !== ("" || null));

  const api = useApi();
  const config = useConfig();
  const router = useRouter();

  const domains = config.domains.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const form = useForm({
    initialValues: {
      target: value.target,
      excluded_categories: value.excluded_categories as any[],
      password: value.password,
      domain: config.domains.find((item) => item.id === value.domain)?.id,
    },

    validate: {
      target: (value) => isURL(value, "The URL you entered is not valid."),
      password: (value) =>
        isProtected && !value ? "Please enter the password." : null,
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

  const handleExcludedCategoriesChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const excluded = parseInt(event.currentTarget.value);
      if (!form.values.excluded_categories.includes(excluded)) {
        form.setFieldValue("excluded_categories", [
          ...form.values.excluded_categories,
          excluded,
        ]);
      } else {
        form.setFieldValue(
          "excluded_categories",
          form.values.excluded_categories.filter((item) => item !== excluded)
        );
      }
    },
    [form.values]
  );

  const handleSubmit = useCallback(() => {
    setLoading(true);
    api.links
      .edit(value.id, form.values)
      .then((response) => {
        console.log(response.data);
        notifications.show({
          title: "Link Updated",
          message: "Your monetized link has been updated successfully.",
          color: "green",
        });
        handleCloseModal();

        if (router.pathname === "/publisher/links") {
          router.replace("/publisher/links");
        } else {
          router.push("/publisher/links");
        }
      })
      .catch((error) => {
        if (error?.response?.data?.errors) {
          form.setErrors(error.response.data.errors);
        } else if (error?.response?.data?.error) {
          notifications.show({
            title: "Error!",
            message: error.response.data.error,
            color: "red",
          });
        } else {
          notifications.show({
            title: "Error!",
            message: "Something went wrong, please try again later.",
            color: "red",
          });
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
          onChange={(event) =>
            form.setFieldValue("target", event.currentTarget.value)
          }
          error={form.errors.target}
          labelProps={{
            mb: "xs",
          }}
          disabled={loading}
          icon={<IconLink size="1rem" />}
        />

        <Select
          required
          label="Short Domain"
          labelProps={{
            mb: "xs",
          }}
          placeholder="Select short domain"
          searchable
          nothingFound="No domains"
          data={domains}
          value={form.values.domain}
          onChange={(item) => form.setFieldValue("domain", item)}
          error={form.errors.domain}
          disabled={loading}
          icon={<IconWorldWww size="1rem" />}
        />

        <Checkbox
          color="red"
          label="This URL is password-protected."
          mb={isProtected ? 0 : "xs"}
          styles={labelStyle}
          checked={isProtected}
          onChange={handleProtectChange}
          disabled={loading}
        />

        {isProtected && (
          <PasswordInput
            required
            label="Access Password"
            placeholder="Enter access password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
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
          {config.ad_categories.map((item) => (
            <Grid.Col span={1} key={item.id}>
              <Checkbox
                value={item.id}
                onChange={handleExcludedCategoriesChange}
                color="green"
                label={item.label}
                styles={labelStyle}
                checked={!form.values.excluded_categories.includes(item.id)}
                disabled={loading}
              />
            </Grid.Col>
          ))}
        </Grid>

        <Text c="dimmed" fz="sm">
          The more ad categories you allow, the higher CPM you will get.
        </Text>

        <Grid columns={3} grow mt="sm">
          <Grid.Col span={1}>
            <Button
              type="reset"
              color="gray"
              fullWidth
              onClick={handleCloseModal}
              disabled={loading}>
              Cancel
            </Button>
          </Grid.Col>
          <Grid.Col span={2}>
            <Button
              type="submit"
              variant="gradient"
              fullWidth
              loading={loading}>
              {loading ? "Processing..." : "Update"}
            </Button>
          </Grid.Col>
        </Grid>
      </Stack>
    </form>
  );
};

export default EditLinkModal;
