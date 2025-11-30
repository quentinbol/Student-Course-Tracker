import type { Student } from "../api/student";
import type { Course } from "../api/courses";
import type { Enrollment } from "../api/enrollments";
import { useMemo } from "react";

type GradeKey = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'F';

export interface EnrollmentTrend {
  month: string;
  enrollments: number;
  courses: number;
  students: number;
}

export interface ChartData {
  name: string;
  students: number;
  fullName?: string;
}

export interface PieData {
  name: string;
  value: number;
}

export interface Stats {
  totalStudents: number;
  totalCourses: number;
  totalEnrollments: number;
  averageGrade: string;
  averageGPA: number;
  gradeCounts: Record<string, number>;
  enrollmentTrends: EnrollmentTrend[];
  chartData: ChartData[];
  pieData: PieData[];
}

const generateFallbackEnrollments = (length: number) =>
  Array.from({ length }, () => Math.floor(Math.random() * 30) + 10);

const calculateGPA = (enrollments: Enrollment[]) => {
  const gradePoints: Record<GradeKey, number> = {
    'A+': 4.3, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0
  };

  const gradesWithValues = enrollments.filter(e => e.grade);
  const avgGPA = gradesWithValues.length > 0
    ? gradesWithValues.reduce((sum, e) => sum + (gradePoints[e.grade as GradeKey] ?? 0), 0) / gradesWithValues.length
    : 0;

  const avgGrade = avgGPA >= 4 ? 'A' : avgGPA >= 3 ? 'B+' : avgGPA >= 2 ? 'C+' : avgGPA >= 1 ? 'D' : 'F';

  const gradeCounts = gradesWithValues.reduce((acc, e) => {
    acc[e.grade!] = (acc[e.grade!] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return { avgGPA, avgGrade, gradeCounts };
};

export const useStatistics = (
  students: Student[],
  courses: Course[],
  enrollments: Enrollment[]
): Stats => {
  const fallbackEnrollments = useMemo(() => generateFallbackEnrollments(courses.length), [courses.length]);

  const { avgGPA, avgGrade, gradeCounts } = useMemo(() => calculateGPA(enrollments), [enrollments]);

  const enrollmentTrends = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return courses.map((course, index) => ({
      month: months[index % 12],
      enrollments: course.enrollmentCount ?? fallbackEnrollments[index % fallbackEnrollments.length],
      courses: courses.length,
      students: students.length,
    }));
  }, [courses, students.length, fallbackEnrollments]);

  const chartData = useMemo(() => {
    return [...courses]
      .sort((a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0))
      .slice(0, 7)
      .map(course => ({
        name: course.code || course.name?.substring(0, 10) || '',
        students: course.enrollmentCount || 0,
        fullName: course.name
      }));
  }, [courses]);

  const pieData = useMemo(() => {
    return Object.entries(gradeCounts)
      .sort((a, b) => (gradeCounts[b[0]] || 0) - (gradeCounts[a[0]] || 0))
      .map(([grade, count]) => ({
        name: grade,
        value: count
      }));
  }, [gradeCounts]);

  return {
    totalStudents: students.length,
    totalCourses: courses.length,
    totalEnrollments: enrollments.length,
    averageGrade: avgGrade,
    averageGPA: Math.round(avgGPA * 100) / 100,
    gradeCounts,
    enrollmentTrends,
    chartData,
    pieData
  };
};
