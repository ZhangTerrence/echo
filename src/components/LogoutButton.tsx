"use client";

import { Button } from "@mantine/core";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export function LogoutButton() {
  const supabase = createClient();

  const logout = async () => {
    await supabase.auth.signOut();
    redirect("/");
  };

  return <Button onClick={() => logout()}>Log out</Button>;
}
