import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Students', 'StudentCourses', 'Courses', 'CourseGrades', 'Enrollments'],
  endpoints: (builder) => ({

    getStudentCourses: builder.query<
      { course_id: number; course_name: string; grade?: string | null }[],
      number
    >({
      query: (studentId) => `/students/${studentId}/courses`,
      providesTags: (_result, _error, studentId) => [{ type: 'StudentCourses', id: studentId }],
    }),
    getCourseGrades: builder.query<
      { student_id: number; student_name: string; grade?: string | null }[],
      number
    >({
      query: (courseId) => `/courses/${courseId}/grades`,
      providesTags: (_result, _error, courseId) => [{ type: 'CourseGrades', id: courseId }],
    }),
  }),
});

export const {
  useGetStudentCoursesQuery,
  useGetCourseGradesQuery,
} = apiSlice;
