import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';

import crypto from 'crypto';

const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

export const generateCsrfToken = (req: Request, res: Response) => {
  const csrfToken = crypto.randomBytes(24).toString('hex');
  res.cookie(CSRF_COOKIE_NAME, csrfToken, {
    httpOnly: false, // Must be readable by client JS
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({ csrfToken });
};

export const verifyCsrfToken: RequestHandler = (req, res, next) => {
  const csrfCookie = req.cookies['csrf_token'];
  const csrfHeader = req.headers['x-csrf-token'];

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    res.status(403).json({ error: 'Invalid CSRF token' });
    return;
  }

  next(); // ✅ only call next when safe
};