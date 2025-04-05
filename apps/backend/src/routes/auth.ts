import { RequestHandler } from 'express';
import { Router, type Router as ExpressRouter } from 'express';
import * as authController from '../controllers/authController';
import { authLimiter } from '../middlewares/rateLimiter';
import { AuthRequest, requireAuth } from '../middlewares/auth';
import { prisma } from '@ai-job-tracker/db';

const router: ExpressRouter = Router();

router.post('/signup', authController.signup);
router.post('/login', authLimiter, authController.login);
router.post('/logout', authController.logout);

const getMe: RequestHandler = async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true },
  });

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json(user);
};

router.get('/me', requireAuth, getMe);

export default router;
