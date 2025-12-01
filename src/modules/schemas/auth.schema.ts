import z from 'zod';

export const signupSchema = z.object({
  name: z.string().min(8),
  email: z.email(),
  password: z.string().min(8),
});

export type TSignupPayload = z.infer<typeof signupSchema>;

export const verifySignupUserSchema = z.object({
  email: z.email(),
  otp: z.string().min(6).max(6),
});

export type TVerifySignUser = z.infer<typeof verifySignupUserSchema>;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type TLoginPayload = z.infer<typeof loginSchema>;
