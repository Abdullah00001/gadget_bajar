import z from 'zod';

export const signupSchema = z.object({
  name: z.string().min(8),
  email: z.email(),
  password: z.string().min(8),
});

export type TSignupPayload = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type TLoginPayload = z.infer<typeof loginSchema>;
