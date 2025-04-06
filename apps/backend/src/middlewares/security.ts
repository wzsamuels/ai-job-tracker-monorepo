import helmet from 'helmet';
import cors from 'cors';
import { Application } from 'express';

const devOrigins = ['http://localhost:3000'];
const prodOrigins = ['https://jobtracker.zach-samuels.com'];

const allowedOrigins =
  process.env.NODE_ENV === 'production' ? prodOrigins : [...prodOrigins, ...devOrigins];

export function applySecurity(app: Application) {
  app.use(helmet());

  

  app.use(
    cors({
      origin: (origin, callback) => {
        console.log('🌍 Incoming Origin:', origin);
  
        if (!origin || allowedOrigins.includes(origin)) {
          console.log('✅ Allowed Origin:', origin);
          callback(null, true);
        } else {
          console.warn('❌ Blocked by CORS:', origin);
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    })
  );
}
