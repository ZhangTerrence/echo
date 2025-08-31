"use client";

import { Button, LoadingOverlay, Paper, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { zod4Resolver } from "mantine-form-zod-resolver";

import { CreateCommunity } from "@/lib/actions/community/create";
import { CreateCommunitySchema } from "@/lib/zod/community/create";
import { constructFormData } from "@/utils/form-data";

export function CreateCommunityForm() {
  const [loading, { close, open }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      description: "",
      name: "",
    },
    mode: "uncontrolled",
    validate: zod4Resolver(CreateCommunitySchema),
  });

  const create = async () => {
    const validationResponse = form.validate();
    if (validationResponse.hasErrors) {
      form.setErrors(validationResponse.errors);
      return;
    }

    open();
    const created = await CreateCommunity(constructFormData(form.values));
    close();

    console.log(created);
  };

  return (
    <Paper p="lg" radius="md" withBorder>
      <LoadingOverlay overlayProps={{ blur: 2, radius: "sm" }} visible={loading} zIndex={1000} />

      <Text fw={500} mb="lg" size="lg">
        Create Community
      </Text>

      <form onSubmit={form.onSubmit(() => create())}>
        <Stack gap="xs">
          <TextInput
            error={form.errors.name}
            label="Name"
            onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
            placeholder="The community's name"
            radius="md"
            required
            value={form.values.name}
            wrapperProps={{
              className: "w-[40rem]",
            }}
          />
          <Textarea
            classNames={{
              input: "py-2",
            }}
            error={form.errors.description}
            label="Description"
            onChange={(event) => form.setFieldValue("description", event.currentTarget.value)}
            placeholder="The community's description"
            radius="md"
            resize="vertical"
            value={form.values.description}
            wrapperProps={{
              className: "w-[40rem]",
            }}
          />
        </Stack>

        <Button className="float-right" mt="md" type="submit">
          Create
        </Button>
      </form>
    </Paper>
  );
}
