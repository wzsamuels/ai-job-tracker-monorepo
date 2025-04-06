import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

export interface AuthRequest extends Request {
  userId?: string;
}

export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;

  console.log('🔐 Incoming request to protected route');
  console.log('🍪 Cookies:', req.cookies);
  console.log('🔗 Origin:', req.headers.origin);
  
  if (!token) {
    console.warn('❌ No token found in request cookies');
    res.status(401).json({ error: 'Authentication token not found. Please log in.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    if (!decoded?.userId) {
      console.warn('❌ JWT did not contain userId');
      res.status(403).json({ error: 'Malformed token: user ID missing' });
      return;
    }

    (req as unknown as AuthRequest).userId = decoded.userId;
    next();
  } catch (err: any) {
    console.error('❌ Failed to verify JWT:', err?.message);
    
    if (err.name === 'TokenExpiredError') {
      res.status(403).json({ error: 'Session expired. Please log in again.' });
      return;
    }

    if (err.name === 'JsonWebTokenError') {
      res.status(403).json({ error: 'Invalid token. Please log in again.' });
      return;
    }

    res.status(403).json({ error: 'Authentication failed.' });
    return
  }
};
