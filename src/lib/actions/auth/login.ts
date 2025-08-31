"use server";

import { AuthError } from "@supabase/auth-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod/v4";

import { LoginSchema } from "@/lib/zod/auth/login";
import { constructObject } from "@/utils/form-data";
import { createClient } from "@/utils/supabase/server";

export type LoginResponseType =
  | {
      error: AuthError;
      errorType: "AUTH_ERROR";
    }
  | {
      error: unknown;
      errorType: "SCHEMA_ERROR";
    };

export async function login(formData: FormData): Promise<LoginResponseType> {
  const supabase = await createClient();

  const validatedFields = LoginSchema.safeParse(constructObject(formData));
  if (!validatedFields.success) {
    return {
      error: z.flattenError(validatedFields.error),
      errorType: "SCHEMA_ERROR",
    };
  }

  const { error } = await supabase.auth.signInWithPassword(validatedFields.data);
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
