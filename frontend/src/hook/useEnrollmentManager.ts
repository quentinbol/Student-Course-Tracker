import { useState } from "react";

export interface EnrollForm {
  studentId: string;
  courseId: string;
}

export const useEnrollmentManager = (
  enrollStudent: (args: { student_id: number; course_id: number }) => Promise<void>, 
  setSuccess: (msg: string) => void
) => {
  const [enrollForm, setEnrollForm] = useState<EnrollForm>({ studentId: '', courseId: '' });

  const handleEnroll = async () => {
    if (!enrollForm.studentId || !enrollForm.courseId) return;
    
    try {
      await enrollStudent({
        student_id: parseInt(enrollForm.studentId),
        course_id: parseInt(enrollForm.courseId)
      });
      
      setSuccess('Student enrolled successfully');
      setEnrollForm({ studentId: '', courseId: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error enrolling student:', err);
    }
  };

  return { enrollForm, setEnrollForm, handleEnroll };
};