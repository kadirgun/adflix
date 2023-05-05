import AuthLayout from "@/layouts/AuthLayout";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Anchor,
  Stack,
  Title,
  Box,
  Notification,
} from "@mantine/core";
import Head from "next/head";
import React, { ReactElement, useEffect, useState } from "react";
import ErrorMessages from "@/components/ErrorMessages";
import { IErrorMessageResponse } from "@/components/types";
import { useRouter } from "next/router";
import { IconMail, IconX } from "@tabler/icons-react";
import { useApi } from "@/hooks";

export const Verify = (props: PaperProps) => {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const api = useApi();

  const { id, expires, hash, signature } = router.query;

  useEffect(() => {
    if(!id) return;
    console.log(router.query);


    api.auth
      .verify({
        expires: expires?.toString() || "",
        hash: hash?.toString() || "",
        id: id?.toString() || "",
        signature: signature?.toString() || "",
      })
      .then((response) => {
        //console.log(response);
      })
      .catch((error) => {
        if (error?.response?.data.error) {
          setError(error?.response?.data.error);
        } else {
          setError("Something went wrong, please try again later.");
        }
      });
  }, [signature]);

  return (
    <>
      <Head>
        <title>Verify - Adflix</title>
      </Head>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}>
        Email Verification
      </Title>
      <Paper p="sm" h={400} mt={30} withBorder {...props}>
        <Stack justify="center" px="xl" h="100%">
          {error ? (
            <Notification
              icon={<IconX />}
              color="red"
              withCloseButton={false}>
              {error}
            </Notification>
          ) : (
            <Notification
              loading
              title="Please wait..."
              withCloseButton={false}>
              We are verifying your email address
            </Notification>
          )}
        </Stack>
      </Paper>
    </>
  );
};

Verify.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>;
Verify.without = ["auth"];

export default Verify;
