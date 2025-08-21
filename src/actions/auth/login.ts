"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { LoginSchema } from "@/lib/zod/login-schema";
import { z } from "zod/v4";
import { constructObject } from "@/lib/form-data";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const validatedFields = LoginSchema.safeParse(constructObject(formData));
  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error),
    };
  }

  const { error } = await supabase.auth.signInWithPassword(validatedFields.data);
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
