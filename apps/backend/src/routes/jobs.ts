import * as jobController from '../controllers/jobsController';
import { validate } from '../middlewares/validate';
import { JobSchema } from '@ai-job-tracker/validators';
import { requireAuth } from '../middlewares/auth';
import { verifyCsrfToken } from '../middlewares/csrf';
import { Router, type Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();


// 🔐 Require login for all /api/jobs routes
router.use(requireAuth);

// 📋 Job routes
router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJob);

// ✅ Protected + validated routes
router.post(
  '/',
  verifyCsrfToken,
  validate(JobSchema),
  jobController.createJob
);

router.put(
  '/:id',
  verifyCsrfToken,
  validate(JobSchema.partial()), // allow partial updates
  jobController.updateJob
);

router.delete('/:id', verifyCsrfToken, jobController.deleteJob);

export default router;
