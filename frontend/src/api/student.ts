import { apiSlice } from "./apiSlice";

export type StudentEnrollment = {
  id: number;
  grade: string;
  course: {
    id: number;
    name: string;
    code: string;
  };
};

export type Student = {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  created_at?: string;
  enrollmentCount?: number;
  enrollments?: StudentEnrollment[];
};

export const extendedStudentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getStudents: builder.query<Student[], void>({
      query: () => '/students',
      providesTags: (result) =>
        result ? [...result.map((s) => ({ type: 'Students' as const, id: s.id })), { type: 'Students', id: 'LIST' }] : [{ type: 'Students', id: 'LIST' }],
    }),

    getStudent: builder.query<Student | null, number>({
      query: (id) => `/students/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Students', id }],
    }),

    addStudent: builder.mutation<Student, Partial<Student>>({
      query: (body) => ({
        url: '/students',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Students', id: 'LIST' }],
    }),

  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useAddStudentMutation,
} = extendedStudentApi;