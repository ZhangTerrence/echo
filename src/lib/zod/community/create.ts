import z from "zod/v4";

export const CreateCommunitySchema = z.object({
  description: z.string(),
  name: z.string().min(3, {
    error: "Name must be at least 3 characters long.",
  }),
});
