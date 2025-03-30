import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 