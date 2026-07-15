import z from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3).max(32),
  email: z.email(),
  password: z.string().min(8).max(32),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(32),
});

export type ISignUpForm = z.infer<typeof signUpSchema>;
export type ILoginForm = z.infer<typeof loginSchema>;
