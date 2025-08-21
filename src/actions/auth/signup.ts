"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod/v4";

import { RegisterSchema } from "@/lib/zod/register-schema";
import { constructObject } from "@/utils/form-data";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const validatedFields = RegisterSchema.safeParse(constructObject(formData));
  if (!validatedFields.success) {
    return z.treeifyError(validatedFields.error);
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
