import z from "zod";

export const SignInSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const SignUpSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters long."),
  email: z.email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});
