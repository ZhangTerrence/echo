import { AppShell, AppShellHeader, AppShellMain, Group, Text, Title } from "@mantine/core";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import NextIcon from "@/../public/next.svg";

export default function Home() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShellHeader>
        <Group className="h-full px-4">
          <Image src={NextIcon} alt="logo" width={100} height={100} />
        </Group>
      </AppShellHeader>
      <AppShellMain>
        <Title className="mt-20 text-center">
          Welcome to{" "}
          <Text inherit variant="gradient" component="span" gradient={{ from: "pink", to: "yellow" }}>
            Mantine
          </Text>{" "}
          +{" "}
          <Text inherit variant="gradient" component="span" gradient={{ from: "blue", to: "green" }}>
            TailwindCSS
          </Text>
        </Title>
        <Text
          className="mt-xl mx-auto max-w-[500px] text-center text-gray-700 dark:text-gray-300"
          ta="center"
          size="lg"
          maw={580}
          mx="auto"
          mt="xl"
        >
          This starter Next.js project includes a minimal setup for Mantine with TailwindCSS. To get started edit
          page.tsx file.
        </Text>
        <div className="mt-10 flex justify-center">
          <ThemeSwitcher />
        </div>
      </AppShellMain>
    </AppShell>
  );
}
