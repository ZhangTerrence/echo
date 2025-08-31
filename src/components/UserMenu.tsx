"use client";

import { Button, Menu } from "@mantine/core";
import { LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

import { showAuthErrorMessage } from "@/utils/notifications";
import { createClient } from "@/utils/supabase/client";

export function UserMenu(props: { username: string }) {
  const supabase = createClient();
  const router = useRouter();

  const logout = async () => {
    const response = await supabase.auth.signOut();
    if (response.error) {
      showAuthErrorMessage(response.error);
      return;
    }
    router.refresh();
  };

  return (
    <Menu offset={10} shadow="md" width={200}>
      <Menu.Target>
        <Button>{props.username}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<Settings />}>Settings</Menu.Item>
        <Menu.Item leftSection={<LogOut />} onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
