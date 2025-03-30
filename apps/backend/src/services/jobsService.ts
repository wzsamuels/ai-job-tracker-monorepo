import prisma from '../utils/prisma';
import { JobApplication } from '@prisma/client';

export const getAllJobs = async (userId: string): Promise<JobApplication[]> => {
  return prisma.jobApplication.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getJobById = async (userId: string, id: string): Promise<JobApplication | null> => {
  return prisma.jobApplication.findFirst({
    where: { id, userId },
  });
};

export const createJob = async (
  userId: string,
  data: Omit<JobApplication, 'id' | 'userId' | 'createdAt'>
): Promise<JobApplication> => {
  return prisma.jobApplication.create({
    data: {
      ...data,
      userId,
    },
  });
};


export const updateJob = async (
  userId: string,
  id: string,
  data: Partial<JobApplication>
): Promise<JobApplication> => {
  return prisma.jobApplication.update({
    where: {
      id,
      userId,
    } as any, // Workaround for Prisma composite key limitation
    data,
  });
};

export const deleteJob = async (userId: string, id: string): Promise<void> => {
  await prisma.jobApplication.deleteMany({
    where: { id, userId },
  });
};
