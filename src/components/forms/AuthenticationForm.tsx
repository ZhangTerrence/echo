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
import { useEffect, useState } from "react";
import Link from "next/link";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { LoginSchema } from "@/lib/zod/login-schema";
import { RegisterSchema } from "@/lib/zod/register-schema";
import { signup } from "@/actions/auth/signup";
import { constructFormData } from "@/utils/form-data";
import { login } from "@/actions/auth/login";
import { useDisclosure } from "@mantine/hooks";
import { showErrorNotifications } from "@/utils/notifications";

export function AuthenticationForm(props: { type: "login" | "register" }) {
  const [type, toggle] = useToggle(["login", "register"]);
  const [step, setStep] = useState(0);
  const [loading, { toggle: toggleLoading }] = useDisclosure(false);

  const isLogin = props.type === "login";

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
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
    <Paper radius="md" p="lg" withBorder {...props}>
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

      <Text size="lg" fw={500} mb="lg">
        {upperFirst(props.type)}
      </Text>

      <form onSubmit={form.onSubmit(() => authenticate())}>
        <Stack gap="xs">
          {type === "register" && step === 0 && (
            <TextInput
              required
              label="Username"
              placeholder="Your username"
              value={form.values.username}
              onChange={(event) => form.setFieldValue("username", event.currentTarget.value)}
              error={form.errors.username}
              radius="md"
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
                required
                label="Email"
                placeholder="hello@mantine.dev"
                value={form.values.email}
                onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
                error={form.errors.email}
                radius="md"
                wrapperProps={{
                  className: "w-[40rem]",
                }}
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
                error={form.errors.password}
                radius="md"
                wrapperProps={{
                  className: "w-[40rem]",
                }}
              />
            </>
          )}
        </Stack>
        <Group justify="space-between" mt="md">
          {(isLogin || step === 0) && (
            <Anchor component={Link} type="button" c="dimmed" size="sm" href={isLogin ? "/register" : "/login"}>
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
