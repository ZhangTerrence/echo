import { Button, Center } from "@mantine/core";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";

import { AuthenticationForm } from "@/components/forms/AuthenticationForm";

export default function LoginPage() {
  return (
    <Center className="min-h-screen w-screen">
      <Button
        className="absolute top-0 left-0 m-2 w-fit"
        component={Link}
        href="/"
        leftSection={<ArrowLeftFromLine />}
        variant="subtle"
      >
        Echo
      </Button>
      <AuthenticationForm type="login" />
    </Center>
  );
}
