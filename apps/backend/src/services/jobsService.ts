import prisma from '../utils/prisma';
import { JobApplication } from '@prisma/client';

export const getAllJobs = async (): Promise<JobApplication[]> => {
  return prisma.jobApplication.findMany();
};

export const getJobById = async (id: string): Promise<JobApplication | null> => {
  return prisma.jobApplication.findUnique({
    where: { id },
  });
};

export const createJob = async (data: Omit<JobApplication, 'id' | 'createdAt'>): Promise<JobApplication> => {
  return prisma.jobApplication.create({
    data,
  });
};

export const updateJob = async (id: string, data: Partial<JobApplication>): Promise<JobApplication> => {
  return prisma.jobApplication.update({
    where: { id },
    data,
  });
};

export const deleteJob = async (id: string): Promise<JobApplication> => {
  return prisma.jobApplication.delete({
    where: { id },
  });
};