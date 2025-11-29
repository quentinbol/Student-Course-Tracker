import { useState } from 'react';
import { Alert, AlertDescription } from './components/ui/alert';
import { Loader2 } from 'lucide-react';
import { useGetStudentsQuery, type Student } from './api/student';
import { useGetCoursesQuery, type Course } from './api/courses';
import { useEnrollStudentMutation, useGetEnrollmentsQuery, useRecordGradeMutation } from './api/enrollments';
import { useStatistics } from './hook/useStatistics';
import { useEnrollmentManager } from './hook/useEnrollmentManager';
import { useGradeManager } from './hook/useGradeManager';
import { useSearch } from './hook/useSearch';
import { DashboardView } from './view/DashboardView';
import { StudentsView } from './view/StudentView';
import { CoursesView } from './view/CourseView';
import { ManageView } from './view/ManagingView';
import { Navigation } from './components/basic/Navigation';
import { Header } from './components/basic/Header';

export default function StudentCourseTracker() {

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const { data: students = [], isLoading: studentsLoading, error: studentsError } = useGetStudentsQuery();
  const { data: courses = [], isLoading: coursesLoading, error: coursesError } = useGetCoursesQuery();
  const { data: enrollments = [], isLoading: enrollmentsLoading } = useGetEnrollmentsQuery();

  const [enrollStudent, { isLoading: enrolling }] = useEnrollStudentMutation();
  const [recordGrade, { isLoading: recording }] = useRecordGradeMutation();

  const stats = useStatistics(students, courses, enrollments);

  const { enrollForm, setEnrollForm, handleEnroll } = useEnrollmentManager(
    async (args: { student_id: number; course_id: number }) => {
      const result = await enrollStudent(args);
      if ('error' in result && result.error) {
        throw result.error;
      }
    },
    setSuccess
  );

  const { gradeForm, setGradeForm, handleGrade } = useGradeManager(
    async (args: { student_id: number; course_id: number; grade: string }) => {
      const result = await recordGrade(args);
      if ('error' in result && result.error) {
        throw result.error;
      }
    },
    setSuccess
  );

  const filteredStudents = useSearch<Student>(students, searchTerm, ['first_name', 'email']);
  const filteredCourses = useSearch<Course>(courses, searchTerm, ['name', 'code']);

  const isLoading = studentsLoading || coursesLoading || enrollmentsLoading;
  const error = studentsError || coursesError;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 w-[100vw]">
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert className="mb-4 bg-red-50 border-red-200">
            <AlertDescription className="text-red-800">
              Error loading data. Please try again later.
            </AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {activeTab === 'dashboard' && (
          <DashboardView stats={stats} students={students} courses={courses} />
        )}

        {activeTab === 'students' && (
          <StudentsView students={filteredStudents} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}

        {activeTab === 'courses' && (
          <CoursesView courses={filteredCourses} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}

        {activeTab === 'manage' && (
          <ManageView 
            students={students}
            courses={courses}
            enrollForm={enrollForm}
            setEnrollForm={setEnrollForm}
            gradeForm={gradeForm}
            setGradeForm={setGradeForm}
            onEnroll={handleEnroll}
            onGrade={handleGrade}
            enrolling={enrolling}
            recording={recording}
          />
        )}
      </main>
    </div>
  );
}