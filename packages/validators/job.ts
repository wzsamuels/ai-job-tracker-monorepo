import { z } from 'zod';

export const JobSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  company: z.string(),
  role: z.string(),
  status: z.string(),
  link: z.string().url().optional(),
  notes: z.string().optional(),
  deadline: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
});

export const CreateJobSchema = JobSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
});

export const UpdateJobSchema = CreateJobSchema.partial();

export type Job = z.infer<typeof JobSchema>;
export type CreateJobInput = z.infer<typeof CreateJobSchema>;
export type UpdateJobInput = z.infer<typeof UpdateJobSchema>;
