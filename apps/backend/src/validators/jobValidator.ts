import { z } from 'zod';

export const JobSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  status: z.enum(['applied', 'interviewing', 'reject', 'offer', 'accepted']),
  link: z.string().url().optional(),
  notes: z.string().optional(),
  deadline: z.string().datetime().optional(),
});