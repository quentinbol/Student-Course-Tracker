import { useState } from "react";

export interface GradeForm {
  studentId: string;
  courseId: string;
  grade: string;
}

export const useGradeManager = (
  recordGrade: (args: { student_id: number; course_id: number; grade: string }) => Promise<void>, 
  setSuccess: (msg: string) => void
) => {
  const [gradeForm, setGradeForm] = useState<GradeForm>({ 
    studentId: '', 
    courseId: '', 
    grade: '' 
  });

  const handleGrade = async () => {
    if (!gradeForm.studentId || !gradeForm.courseId || !gradeForm.grade) return;
    
    try {
      await recordGrade({
        student_id: parseInt(gradeForm.studentId),
        course_id: parseInt(gradeForm.courseId),
        grade: gradeForm.grade
      });
      
      setSuccess('Grade recorded successfully');
      setGradeForm({ studentId: '', courseId: '', grade: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error recording grade:', err);
    }
  };

  return { gradeForm, setGradeForm, handleGrade };
};