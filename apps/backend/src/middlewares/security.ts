import helmet from 'helmet';
import cors from 'cors';
import { Application } from 'express';

export function applySecurity(app: Application) {
  app.use(helmet());

  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
      credentials: true,
    })
  );
}
