"use client";

import {
  Anchor,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { useDisclosure } from "@mantine/hooks";
import { zod4Resolver } from "mantine-form-zod-resolver";
import Link from "next/link";
import { useEffect, useState } from "react";

import { login } from "@/actions/auth/login";
import { signup } from "@/actions/auth/signup";
import { LoginSchema } from "@/lib/zod/login-schema";
import { RegisterSchema } from "@/lib/zod/register-schema";
import { constructFormData } from "@/utils/form-data";
import { showErrorNotifications } from "@/utils/notifications";

export function AuthenticationForm(props: { type: "login" | "register" }) {
  const [type, toggle] = useToggle(["login", "register"]);
  const [step, setStep] = useState(0);
  const [loading, { toggle: toggleLoading }] = useDisclosure(false);

  const isLogin = props.type === "login";

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    mode: "uncontrolled",
    validate: isLogin ? zod4Resolver(LoginSchema) : zod4Resolver(RegisterSchema),
  });

  useEffect(() => {
    toggle(props.type ?? "login");
  }, [props.type, toggle]);

  const validateUsername = () => {
    const username = form.values.username;
    if (typeof username !== "string" || username.length < 3) {
      form.setErrors({ username: "Username must contain at least 3 characters." });
      return;
    }

    setStep((step) => step + 1);
  };

  const authenticate = async () => {
    const validationResponse = form.validate();
    if (validationResponse.hasErrors) {
      form.setErrors(validationResponse.errors);
      return;
    }

    toggleLoading();
    if (type === "register") {
      const response = await signup(constructFormData(form.values));
      showErrorNotifications("Error registering.", response);
    } else {
      const response = await login(constructFormData(form.values));
      showErrorNotifications("Error logging in.", response);
    }
    toggleLoading();
  };

  return (
    <Paper p="lg" radius="md" withBorder {...props}>
      <LoadingOverlay overlayProps={{ blur: 2, radius: "sm" }} visible={loading} zIndex={1000} />

      <Text fw={500} mb="lg" size="lg">
        {upperFirst(props.type)}
      </Text>

      <form onSubmit={form.onSubmit(() => authenticate())}>
        <Stack gap="xs">
          {type === "register" && step === 0 && (
            <TextInput
              error={form.errors.username}
              label="Username"
              onChange={(event) => form.setFieldValue("username", event.currentTarget.value)}
              placeholder="Your username"
              radius="md"
              required
              value={form.values.username}
              wrapperProps={{
                className: "w-[40rem]",
              }}
            />
          )}

          {(type === "login" || step > 0) && (
            <>
              <Group grow mb="md" mt="md">
                <Button>Google</Button>
                <Button>Github</Button>
              </Group>

              <Divider label="Or continue with email" labelPosition="center" />

              <TextInput
                error={form.errors.email}
                label="Email"
                onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
                placeholder="hello@mantine.dev"
                radius="md"
                required
                value={form.values.email}
                wrapperProps={{
                  className: "w-[40rem]",
                }}
              />

              <PasswordInput
                error={form.errors.password}
                label="Password"
                onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
                placeholder="Your password"
                radius="md"
                required
                value={form.values.password}
                wrapperProps={{
                  className: "w-[40rem]",
                }}
              />
            </>
          )}
        </Stack>
        <Group justify="space-between" mt="md">
          {(isLogin || step === 0) && (
            <Anchor c="dimmed" component={Link} href={isLogin ? "/register" : "/login"} size="sm" type="button">
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </Anchor>
          )}
          {!isLogin && step > 0 && <Button onClick={() => setStep((step) => step - 1)}>Back</Button>}

          {!isLogin && step === 0 && <Button onClick={() => validateUsername()}>Next</Button>}
          {(isLogin || step > 0) && <Button type="submit">{upperFirst(type)}</Button>}
        </Group>
      </form>
    </Paper>
  );
}
