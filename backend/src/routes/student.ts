import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

const baseQuery = `
  SELECT
    students.id AS student_id,
    students.first_name,
    students.last_name,
    students.email,
    enrollments.id AS enrollment_id,
    enrollments.grade,
    courses.id AS course_id,
    courses.name AS course_name,
    courses.code AS course_code
  FROM students
  LEFT JOIN enrollments ON students.id = enrollments.student_id
  LEFT JOIN courses ON courses.id = enrollments.course_id
`;


router.get('/', async (_, res) => {
  try {
    const [rows] = await pool.query(baseQuery + ' ORDER BY students.id ASC') as [any[], any];

    const studentsMap: Record<number, any> = {};

    for (const row of rows) {
      if (!studentsMap[row.student_id]) {
        studentsMap[row.student_id] = {
          id: row.student_id,
          first_name: row.first_name,
          last_name: row.last_name,
          email: row.email,
          enrollments: []
        };
      }

      if (row.enrollment_id !== null) {
        studentsMap[row.student_id].enrollments.push({
          id: row.enrollment_id,
          grade: row.grade,
          course: {
            id: row.course_id,
            name: row.course_name,
            code: row.course_code
          }
        });
      }
      studentsMap[row.student_id].enrollmentCount = rows.filter(r => r.student_id === row.student_id && r.enrollment_id !== null).length;
    }

    res.json(Object.values(studentsMap));
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(baseQuery + ' WHERE students.id = ? ORDER BY students.id ASC', [id]) as [any[], any];

    if (rows.length === 0) {
      return res.json(null);
    }

    const student = {
      id: rows[0].student_id,
      first_name: rows[0].first_name,
      last_name: rows[0].last_name,
      email: rows[0].email,
      enrollmentCount: rows.filter(r => r.enrollment_id !== null).length,
      enrollments: rows
        .filter(r => r.enrollment_id !== null)
        .map(r => ({
          id: r.enrollment_id,
          grade: r.grade,
          course: {
            id: r.course_id,
            name: r.course_name,
            code: r.course_code
          }
        }))
    };

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Database error ' + err });
  }
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO students (name, email) VALUES (?, ?)', [name, email]);
    res.json({ id: (result as any).insertId, name, email });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

export default router;
