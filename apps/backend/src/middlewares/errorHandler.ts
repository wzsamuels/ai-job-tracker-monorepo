import { Request, Response, NextFunction } from 'express';

// Add comment to force redeploy
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('[Server Error]', err);

  res.status(500).json({
    error: 'Internal Server Error',
  });
};
