import { apiSlice } from "./apiSlice";

export type Course = {
  id: number;
  name: string;
  code?: string;
  description?: string;
  created_at?: string;
  instructor?: string;
  enrollmentCount?: number;
};

export const extendedStudentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getCourses: builder.query<Course[], void>({
          query: () => '/courses',
          providesTags: (result) =>
            result ? [...result.map((c) => ({ type: 'Courses' as const, id: c.id })), { type: 'Courses', id: 'LIST' }] : [{ type: 'Courses', id: 'LIST' }],
        }),

        getCourse: builder.query<Course | null, number>({
          query: (id) => `/courses/${id}`,
          providesTags: (_result, _error, id) => [{ type: 'Courses', id }],
        }),

        addCourse: builder.mutation<Course, Partial<Course>>({
          query: (body) => ({
            url: '/courses',
            method: 'POST',
            body,
          }),
          invalidatesTags: [{ type: 'Courses', id: 'LIST' }],
        }),

    }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useAddCourseMutation,
} = extendedStudentApi;