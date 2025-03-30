import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

export interface AuthRequest extends Request {
  userId?: string;
}

export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ error: 'Authentication required' });
    return; // ✅ just stop here, don’t return the res itself
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    (req as unknown as AuthRequest).userId = decoded.userId;
    next(); // ✅ continue if valid
  } catch {
    res.status(403).json({ error: 'Invalid or expired token' });
    return;
  }
};
