import { RequestHandler } from 'express';
import * as jobService from '../services/jobsService';
import { AuthRequest } from '../middlewares/auth';

export const getJobs: RequestHandler = async (req, res) => {
  try {
    const userId = (req as unknown as AuthRequest).userId!;
    const jobs = await jobService.getAllJobs(userId);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

export const getJob: RequestHandler = async (req, res) => {
  try {
    const userId = (req as unknown as AuthRequest).userId!;
    const job = await jobService.getJobById(userId, req.params.id);
    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
};

export const createJob: RequestHandler = async (req, res) => {
  try {
    const userId = (req as unknown as AuthRequest).userId!;
    const job = await jobService.createJob(userId, req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create job' });
  }
};

export const updateJob: RequestHandler = async (req, res) => {
  try {
    const userId = (req as unknown as AuthRequest).userId!;
    const job = await jobService.updateJob(userId, req.params.id, req.body);
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update job' });
  }
};

export const deleteJob: RequestHandler = async (req, res) => {
  try {
    const userId = (req as unknown as AuthRequest).userId!;
    await jobService.deleteJob(userId, req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete job' });
  }
};
