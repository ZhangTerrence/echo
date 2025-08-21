"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { RegisterSchema } from "@/lib/zod/register-schema";
import { z } from "zod/v4";
import { constructObject } from "@/lib/form-data";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const validatedFields = RegisterSchema.safeParse(constructObject(formData));
  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error),
    };
  }

  const data = {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  const { error } = await supabase.auth.signUp({
    ...data,
    options: {
      data: {
        username: validatedFields.data.username,
      },
    },
  });
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
