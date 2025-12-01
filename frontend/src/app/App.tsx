import { useState } from 'react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2 } from 'lucide-react';
import { Route } from 'react-router-dom';
import { useGetStudentsQuery } from '../api/student';
import { useGetCoursesQuery } from '../api/courses';
import { useEnrollStudentMutation, useGetEnrollmentsQuery, useRecordGradeMutation } from '../api/enrollments';
import { useStatistics } from '../hook/useStatistics';
import { useEnrollmentManager } from '../hook/useEnrollmentManager';
import { useGradeManager } from '../hook/useGradeManager';
import { useSearch } from '../hook/useSearch';
import ModernDashboardView from '../view/DashboardView';
import { StudentsView } from '../view/StudentView';
import { CoursesView } from '../view/CourseView';
import { ManageView } from '../view/ManagingView';
import LayoutWithSidebar from './navigation/Sidebar';
import { BrowserRouter, Navigate, Routes } from 'react-router-dom';

const AppContent = () => {
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

  const filteredStudents = useSearch(students, searchTerm, ['first_name', 'email']);
  const filteredCourses = useSearch(courses, searchTerm, ['name', 'code']);

  const isLoading = studentsLoading || coursesLoading || enrollmentsLoading;
  const error = studentsError || coursesError;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <LayoutWithSidebar>
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

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route 
          path="/dashboard" 
          element={
            <ModernDashboardView 
              stats={stats} 
              students={students} 
              courses={courses}
            />
          } 
        />
        <Route 
          path="/students" 
          element={
            <StudentsView 
              students={filteredStudents}
              courses={courses}
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
          } 
        />
        <Route 
          path="/courses" 
          element={
            <CoursesView 
              courses={filteredCourses} 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
          } 
        />
        <Route 
          path="/manage" 
          element={
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
          } 
        />
      </Routes>
    </LayoutWithSidebar>
  );
}

const StudentCourseTracker = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default StudentCourseTracker;