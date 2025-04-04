import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  createdAt: z.string().datetime(), // or z.date() if parsed on backend
});

export type User = z.infer<typeof UserSchema>;
