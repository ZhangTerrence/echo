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
  Stepper,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useDisclosure, useToggle } from "@mantine/hooks";
import { zod4Resolver } from "mantine-form-zod-resolver";
import Link from "next/link";
import { useEffect, useState } from "react";

import { login, LoginResponseType } from "@/lib/actions/auth/login";
import { register, RegisterResponseType } from "@/lib/actions/auth/register";
import { FlattenedErrors } from "@/lib/zod-error";
import { LoginSchema } from "@/lib/zod/auth/login";
import { RegisterSchema } from "@/lib/zod/auth/register";
import { constructFormData } from "@/utils/form-data";
import { showAuthErrorMessage, showInvalidSchemaErrors } from "@/utils/notifications";

export function AuthenticationForm(props: { type: "login" | "register" }) {
  const [type, toggle] = useToggle(["login", "register"]);
  const [step, setStep] = useState(0);
  const [loading, { close, open }] = useDisclosure(false);

  const isLogin = props.type === "login";

  const nextStep = () => setStep((current) => (current == 0 ? current + 1 : current));
  const prevStep = () => setStep((current) => (current == 1 ? current - 1 : current));

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

    nextStep();
  };

  const authenticate = async () => {
    const validationResponse = form.validate();
    if (validationResponse.hasErrors) {
      form.setErrors(validationResponse.errors);
      return;
    }

    open();
    let response: LoginResponseType | RegisterResponseType;
    if (type === "register") {
      response = await register(constructFormData(form.values));
    } else {
      response = await login(constructFormData(form.values));
    }
    close();

    if (response.errorType === "SCHEMA_ERROR") {
      showInvalidSchemaErrors(response.error as FlattenedErrors);
    } else {
      showAuthErrorMessage(response.error);
    }
  };

  return (
    <Paper p="lg" radius="md" withBorder>
      <LoadingOverlay overlayProps={{ blur: 2, radius: "sm" }} visible={loading} zIndex={1000} />

      <Text fw={500} mb="lg" size="lg">
        {upperFirst(props.type)}
      </Text>

      <form onSubmit={form.onSubmit(() => authenticate())}>
        <Stack gap="xs">
          {type === "register" && (
            <Stepper active={step}>
              <Stepper.Step description="Add username" label="Step 1" />
              <Stepper.Step description="Add email and password" label="Step 2" />
            </Stepper>
          )}

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
                placeholder="Your email"
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
          {!isLogin && step > 0 && <Button onClick={() => prevStep()}>Back</Button>}

          {!isLogin && step === 0 && <Button onClick={() => validateUsername()}>Next</Button>}
          {(isLogin || step > 0) && <Button type="submit">{upperFirst(type)}</Button>}
        </Group>
      </form>
    </Paper>
  );
}
