"use client";

import { Button } from "@mantine/core";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

export function LogoutButton() {
  const supabase = createClient();

  const logout = async () => {
    await supabase.auth.signOut();
    redirect("/");
  };

  return <Button onClick={() => logout()}>Log out</Button>;
}
