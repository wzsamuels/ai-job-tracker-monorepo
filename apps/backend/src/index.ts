import express from 'express';
import dotenv from 'dotenv';
import jobRoutes from './routes/jobs';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import { applySecurity } from './middlewares/security';
import { errorHandler } from './middlewares/errorHandler';
import csrfRoutes from './routes/csrf';
import swaggerUi from 'swagger-ui-express';
import { openApiSpec } from './docs/openapi';
import { logRequestDebug } from './middlewares/logRequestDebug';

dotenv.config();

const app = express();
//const PORT = process.env.PORT || 3001;

app.use(cookieParser());
app.use(express.json());
applySecurity(app);

app.use(logRequestDebug);
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', csrfRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: Date.now() });
});

app.listen(3001, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:3001`);
});


app.use(errorHandler);