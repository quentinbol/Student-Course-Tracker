import { apiSlice } from "./apiSlice";

export type Enrollment = {
  id?: number;
  student_id: number;
  course_id: number;
  grade?: string | null;
  created_at?: string;
};

export const extendedStudentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getEnrollments: builder.query<Enrollment[], void>({
          query: () => '/enrollments',
          providesTags: (result) =>
            result ? [...result.map((e) => ({ type: 'Enrollments' as const, id: e.id })), { type: 'Enrollments', id: 'LIST' }] : [{ type: 'Enrollments', id: 'LIST' }],
        }),

        enrollStudent: builder.mutation<{ message: string }, Partial<Enrollment>>({
          query: (body) => ({
            url: '/enrollments',
            method: 'POST',
            body,
          }),
          invalidatesTags: (_result, _error, arg) => [
            { type: 'Enrollments', id: 'LIST' },
            { type: 'StudentCourses', id: arg?.student_id ?? 'UNKNOWN' },
            { type: 'CourseGrades', id: arg?.course_id ?? 'UNKNOWN' },
          ],
        }),

        recordGrade: builder.mutation<{ message: string }, { student_id: number; course_id: number; grade: string }>({
          query: (body) => ({
            url: '/enrollments',
            method: 'PUT',
            body,
          }),
          invalidatesTags: (_result, _error, arg) => [
            { type: 'StudentCourses', id: arg.student_id },
            { type: 'CourseGrades', id: arg.course_id },
            { type: 'Enrollments', id: 'LIST' },
          ],
        }),

    }),
});

export const {
  useGetEnrollmentsQuery,
  useEnrollStudentMutation,
  useRecordGradeMutation,
} = extendedStudentApi;