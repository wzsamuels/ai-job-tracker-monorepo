// middleware/logRequestDebug.ts
import { Request, Response, NextFunction } from 'express';

export const logRequestDebug = (req: Request, _res: Response, next: NextFunction) => {
  console.log('📥 Incoming Request Debug Info:');
  console.log('🔗 URL:', req.originalUrl);
  console.log('📦 Headers:', req.headers);
  console.log('🍪 Cookies:', req.cookies);
  console.log('🌐 Origin Header:', req.get('origin'));
  console.log('🔒 Authorization Header:', req.get('authorization'));
  next();
};
