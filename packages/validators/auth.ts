import { z } from 'zod';
import { UserSchema } from './user';

export const AuthInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const AuthResponseSchema = z.object({
  user: UserSchema,
});

export type AuthInput = z.infer<typeof AuthInputSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
