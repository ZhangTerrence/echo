"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod/v4";

import { LoginSchema } from "@/lib/zod/login-schema";
import { constructObject } from "@/utils/form-data";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const validatedFields = LoginSchema.safeParse(constructObject(formData));
  if (!validatedFields.success) {
    return z.treeifyError(validatedFields.error);
  }

  const { error } = await supabase.auth.signInWithPassword(validatedFields.data);
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
