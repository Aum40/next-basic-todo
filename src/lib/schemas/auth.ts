import z from 'zod';

export const registerSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .regex(/^[0-9a-zA-Z]{6,}$/, 'Password must have at least 6 character'),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email('invalid email address'),
  password: z.string().min(1, 'password is required'),
});
export type LoginInput = z.infer<typeof loginSchema>;
