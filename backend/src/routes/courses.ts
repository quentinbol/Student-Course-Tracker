import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

const baseQuery = `
  SELECT 
    courses.id AS id,
    courses.name AS name,
    courses.description AS description,
    courses.instructor AS instructor,
    COUNT(enrollments.id) AS enrollmentCount
  FROM courses
  LEFT JOIN enrollments ON courses.id = enrollments.course_id
`;

router.get('/', async (_, res) => {
  try {
    const [rows] = await pool.query(baseQuery + ' GROUP BY courses.id') as [any[], any];

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Database error' + err });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(baseQuery + ' WHERE courses.id = ? GROUP BY courses.id', [id]) as [any[], any];

    res.json(rows[0] || null);
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO courses (name, description) VALUES (?, ?)', [name, description]);
    res.json({ id: (result as any).insertId, name, description });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

export default router;
