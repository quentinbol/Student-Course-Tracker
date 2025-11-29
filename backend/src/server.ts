import express, { type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db.js';
import { logRoute } from './logger.js';

import studentsRouter from './routes/student.js';
import coursesRouter from './routes/courses.js';
import enrollmentsRouter from './routes/enrollments.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', logRoute(async (_req: Request, res: Response) => {
  const [rows] = await pool.query('SELECT NOW() AS now');
  res.json({ message: 'API running', dbTime: rows });
}));

app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);
app.use('/enrollments', enrollmentsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

export default app;
