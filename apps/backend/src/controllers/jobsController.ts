import { Request, Response } from "express";
import * as jobsService from "../services/jobsService";

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await jobsService.getAllJobs();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

export const getJob = async (req: Request, res: Response) => {
  try {
    const job = await jobsService.getJobById(req.params.id);
    if(!job) return res.status(404).json({ error: 'Job not found' });      
    res.json(job);
  } catch(error) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
}

export const createJob = async (req: Request, res: Response) => {
  try {
    const job = await jobsService.createJob(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create job' });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const job = await jobsService.updateJob(req.params.id, req.body);
    res.json(job);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update job' });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    await jobsService.deleteJob(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete job' });
  }
};