import { AuthenticationForm } from "@/components/forms/AuthenticationForm";
import { Button, Center } from "@mantine/core";
import Link from "next/link";
import { ArrowLeftFromLine } from "lucide-react";

export default function LoginPage() {
  return (
    <Center className="min-h-screen w-screen">
      <Button
        component={Link}
        leftSection={<ArrowLeftFromLine />}
        href="/"
        variant="subtle"
        className="absolute top-0 left-0 m-2 w-fit"
      >
        Echo
      </Button>
      <AuthenticationForm type="register" />
    </Center>
  );
}
