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
  Card,
  Container,
  Loader,
  AspectRatio,
} from "@mantine/core";
import Head from "next/head";
import React, { ReactElement, useEffect, useState } from "react";
import ErrorMessages from "@/components/ErrorMessages";
import { IErrorMessageResponse } from "@/components/types";
import { useRouter } from "next/router";
import { IconMail, IconMailCheck, IconMailX, IconX } from "@tabler/icons-react";
import { useApi } from "@/hooks";
import Link from "next/link";

export const Verify = (props: PaperProps) => {
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const router = useRouter();
  const api = useApi();

  const { id, expires, hash, signature } = router.query;
  const colors = {
    loading: "blue",
    success: "green",
    error: "red",
  };

  useEffect(() => {
    if (!id) return;
    console.log(router.query);

    api.auth
      .verify({
        expires: expires?.toString() || "",
        hash: hash?.toString() || "",
        id: id?.toString() || "",
        signature: signature?.toString() || "",
      })
      .then((response) => {
        setStatus("success");
      })
      .catch((error) => {
        if (error?.response?.data.error) {
          setError(error?.response?.data.error);
        } else {
          setError("Something went wrong, please try again later.");
        }
        setStatus("error");
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
      <AspectRatio ratio={1}>
        <Container>
          <Card shadow="sm" padding="lg" radius="md" mt="xl" w="100%">
            <Card.Section>
              <Stack
                bg={colors[status]}
                h={100}
                justify="center"
                align="center">
                {status === "loading" && <Loader color="white" />}
                {status === "success" && (
                  <IconMailCheck color="white" size={50} />
                )}
                {status === "error" && <IconMailX color="white" size={50} />}
              </Stack>
            </Card.Section>

            <Stack justify="center">
              <Text my="md" size="sm" color="dimmed" align="center">
                {status === "loading" && "We are verifying your email address"}
                {status === "success" && "Your email address has been verified"}
                {status === "error" && error}
              </Text>

              {status !== "loading" && (
                <Link href="/publisher">
                  <Button
                    variant="light"
                    color="blue"
                    component="button"
                    fullWidth
                    mt="md"
                    radius="md">
                    Go to Dashboard
                  </Button>
                </Link>
              )}
            </Stack>
          </Card>
        </Container>
      </AspectRatio>
    </>
  );
};

Verify.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>;
Verify.without = ["auth"];

export default Verify;
