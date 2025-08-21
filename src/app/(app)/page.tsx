import { AppShell, AppShellHeader, AppShellMain, Group, Autocomplete, Button, Text } from "@mantine/core";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Copy, Search } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { LogoutButton } from "@/components/LogoutButton";

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShellHeader withBorder>
        <Group className="h-full justify-between px-4">
          <Button component={Link} leftSection={<Copy />} href="/" variant="transparent">
            Echo
          </Button>
          <Autocomplete
            placeholder="Search"
            leftSection={<Search />}
            visibleFrom="xs"
            clearable
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
