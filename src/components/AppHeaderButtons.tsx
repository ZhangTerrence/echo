import { Button } from "@mantine/core";
import Link from "next/link";

import { UserMenu } from "@/components/UserMenu";
import { createClient } from "@/utils/supabase/server";

export async function AppHeaderButtons() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return data.user ? (
    <UserMenu username={data.user.user_metadata.username} />
  ) : (
    <>
      <Button component={Link} href="/register" variant="subtle">
        Register
      </Button>
      <Button component={Link} href="/login" variant="subtle">
        Log in
      </Button>
    </>
  );
}
