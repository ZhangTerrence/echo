"use server";

import { AuthError } from "@supabase/auth-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod/v4";

import { RegisterSchema } from "@/lib/zod/auth/register";
import { constructObject } from "@/utils/form-data";
import { createClient } from "@/utils/supabase/server";

export type RegisterResponseType =
  | {
      error: AuthError;
      errorType: "AUTH_ERROR";
    }
  | {
      error: unknown;
      errorType: "SCHEMA_ERROR";
    };

export async function register(formData: FormData): Promise<RegisterResponseType> {
  const supabase = await createClient();

  const validatedFields = RegisterSchema.safeParse(constructObject(formData));
  if (!validatedFields.success) {
    return {
      error: z.flattenError(validatedFields.error),
      errorType: "SCHEMA_ERROR",
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
    console.error(error);
    return {
      error: error,
      errorType: "AUTH_ERROR",
    };
  }

  revalidatePath("/");
  redirect("/");
}
