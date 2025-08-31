import { Center } from "@mantine/core";

import { CreateCommunityForm } from "@/components/forms/CreateCommunityForm";

export default async function CreateCommunityPage() {
  return (
    <Center
      classNames={{
        root: "grow",
      }}
    >
      <CreateCommunityForm />
    </Center>
  );
}
