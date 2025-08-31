"use server";

import { z } from "zod/v4";

import { db } from "@/database";
import { communities } from "@/database/schema/community";
import { CreateCommunitySchema } from "@/lib/zod/community/create";
import { constructObject } from "@/utils/form-data";
import { createClient } from "@/utils/supabase/server";

export async function CreateCommunity(formData: FormData) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    console.log(data);
    return {
      errorType: "AUTH_ERROR",
    };
  }

  const validatedFields = CreateCommunitySchema.safeParse(constructObject(formData));
  if (!validatedFields.success) {
    return {
      error: z.flattenError(validatedFields.error),
      errorType: "SCHEMA_ERROR",
    };
  }

  return db
    .insert(communities)
    .values({
      description: validatedFields.data.description,
      name: validatedFields.data.name,
      ownerId: data.user.id,
    })
    .returning();
}
