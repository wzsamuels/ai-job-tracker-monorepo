import { z } from 'zod';

export const JobSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  status: z.enum(['applied', 'interviewing', 'reject', 'offer', 'accepted']),
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
