import z from "zod/v4";

export const LoginSchema = z.object({
  email: z.email({ error: "Invalid email address." }),
  password: z
    .string()
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .min(8, { message: "Password must be at least 8 characters long." }),
});
