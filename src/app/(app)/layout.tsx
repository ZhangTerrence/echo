import { AppShell, AppShellHeader, AppShellMain, Autocomplete, Group } from "@mantine/core";
import { Copy, Search } from "lucide-react";
import React from "react";

import { AppHeaderButtons } from "@/components/AppHeaderButtons";
import { AppNavbar } from "@/components/AppNavbar";
import { LinkButton } from "@/components/LinkButton";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell
      classNames={{
        main: "flex",
      }}
      header={{ height: 60 }}
      navbar={{ breakpoint: 0, width: 300 }}
      padding="md"
    >
      <AppShellHeader>
        <Group className="h-full justify-between px-4">
          <LinkButton href="/" icon={<Copy />} text="Echo" />
          <Autocomplete
            clearable
            leftSection={<Search />}
            placeholder="Search"
            visibleFrom="sm"
            wrapperProps={{
              className: "w-1/2",
            }}
          />
          <Group gap="xs">
            <AppHeaderButtons />
          </Group>
        </Group>
      </AppShellHeader>
      <AppNavbar />
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
}
