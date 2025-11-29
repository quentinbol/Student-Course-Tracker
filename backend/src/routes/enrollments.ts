import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM enrollments');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

router.post('/', async (req, res) => {
  const { student_id, course_id } = req.body;
  try {
    await pool.query('INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)', [student_id, course_id]);
    res.json({ message: 'Student enrolled', student_id, course_id });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

router.put('/', async (req, res) => {
  const { student_id, course_id, grade } = req.body;
  try {
    await pool.query('UPDATE enrollments SET grade = ? WHERE student_id = ? AND course_id = ?', [grade, student_id, course_id]);
    res.json({ message: 'Grade recorded', student_id, course_id, grade });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

router.get('/course/:id/grades', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT s.id AS student_id, s.name AS student_name, e.grade
       FROM enrollments e
       JOIN students s ON e.student_id = s.id
       WHERE e.course_id = ?`,
      [id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

router.get('/student/:id/courses', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT c.id AS course_id, c.name AS course_name, e.grade
       FROM enrollments e
       JOIN courses c ON e.course_id = c.id
       WHERE e.student_id = ?`,
      [id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

router.get('/courses/:id/students', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT s.id, s.first_name, s.last_name, s.email, e.grade
       FROM enrollments e
       JOIN students s ON e.student_id = s.id
       WHERE e.course_id = ?`,
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});


export default router;
