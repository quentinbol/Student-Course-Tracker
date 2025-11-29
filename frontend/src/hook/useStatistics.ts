import type { Student } from "../api/student";
import type { Course } from "../api/courses";
import type { Enrollment } from "../api/enrollments";
import { useMemo } from "react";

type GradeKey = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'F';

interface Stats {
  totalStudents: number;
  totalCourses: number;
  totalEnrollments: number;
  averageGrade: string;
  averageGPA: number;
}

export const useStatistics = (
  students: Student[],
  courses: Course[],
  enrollments: Enrollment[]
): Stats => {
  return useMemo(() => {
    const totalEnrollments = enrollments.length;
    const gradesWithValues = enrollments.filter(e => e.grade && e.grade !== null);
    
    const gradePoints: Record<GradeKey, number> = {
      'A+': 4.3, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0
    };
    
    const avgGPA = gradesWithValues.length > 0
      ? gradesWithValues.reduce((sum, e) => {
          if (typeof e.grade === 'string' && gradePoints[e.grade as GradeKey] !== undefined) {
            return sum + gradePoints[e.grade as GradeKey];
          }
          return sum;
        }, 0) / gradesWithValues.length
      : 0;
    
    const avgGrade = avgGPA >= 4.0 ? 'A' :
                     avgGPA >= 3.0 ? 'B+' :
                     avgGPA >= 2.0 ? 'C+' :
                     avgGPA >= 1.0 ? 'D' : 'F';
    
    return {
      totalStudents: students.length,
      totalCourses: courses.length,
      totalEnrollments,
      averageGrade: avgGrade,
      averageGPA: Math.round(avgGPA * 100) / 100
    };
  }, [students, courses, enrollments]);
}