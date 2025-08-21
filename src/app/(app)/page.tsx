import { AppShell, AppShellHeader, AppShellMain, Autocomplete, Button, Group, Text } from "@mantine/core";
import { Copy, Search } from "lucide-react";
import Link from "next/link";

import { LogoutButton } from "@/components/LogoutButton";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShellHeader withBorder>
        <Group className="h-full justify-between px-4">
          <Button component={Link} href="/" leftSection={<Copy />} variant="transparent">
            Echo
          </Button>
          <Autocomplete
            clearable
            leftSection={<Search />}
            placeholder="Search"
            visibleFrom="xs"
            wrapperProps={{
              className: "w-1/2",
            }}
          />
          <Group gap="xs">
            {data.user ? (
              <Text>{data.user.email}</Text>
            ) : (
              <>
                <Button component={Link} href="/register" variant="subtle">
                  Register
                </Button>
                <Button component={Link} href="/login" variant="subtle">
                  Log in
                </Button>
              </>
            )}
          </Group>
        </Group>
      </AppShellHeader>
      <AppShellMain>
        <ThemeSwitcher />
        {data.user && <LogoutButton />}
      </AppShellMain>
    </AppShell>
  );
}
