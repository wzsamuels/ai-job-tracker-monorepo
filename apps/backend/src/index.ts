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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cookieParser());
app.use(express.json());
applySecurity(app);

app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', csrfRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(errorHandler);