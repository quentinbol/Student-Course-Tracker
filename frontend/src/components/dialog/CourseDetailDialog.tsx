import React from 'react';
import { X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Users, Award, BookOpen } from 'lucide-react';
import type { Course } from '../../api/courses';
import { useGetCourseStudentsQuery, type Enrollment } from '../../api/enrollments';
import { useStatistics } from '../../hook/useStatistics';
import type { Student } from '../../api/student';
import useGradeColor from '../../hook/useGradeColor';

interface CourseDetailDialogProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CourseDetailDialog: React.FC<CourseDetailDialogProps> = ({ course, isOpen, onClose }) => {
  const { data: enrolledStudents = [], isLoading } = useGetCourseStudentsQuery(course?.id || 0, {
    skip: !course?.id
  });

  const enrollmentsForCourse: Enrollment[] = enrolledStudents.map(student => ({
    id: student.id,
    student_id: student.id,
    course_id: course?.id ?? 0,
    grade: student.grade,
  })) as Enrollment[];

  const { averageGPA } = useStatistics(enrolledStudents as Student[], course ? [course] : [], enrollmentsForCourse);
  const getGradeColor = useGradeColor();

  if (!course) return null;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      <div className={`
        fixed top-0 right-0 h-full w-full md:w-[700px] bg-white shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{course.name}</h2>
                <p className="text-base mt-1 text-gray-500">
                  {course.code} • Instructor: {course.instructor}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>
        <div className="h-[calc(100%-112px)] overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="text-sm font-medium">Enrolled Students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{course.enrollmentCount || 0}</span>
                    <Users className="h-8 w-8 text-blue-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="text-sm font-medium">Average GPA</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{averageGPA ? averageGPA.toFixed(2) : '-'}</span>
                    <Award className="h-8 w-8 text-green-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="text-sm font-medium">Course Code</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{course.code}</span>
                    <BookOpen className="h-8 w-8 text-purple-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {course.description && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{course.description}</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Enrolled Students
                </CardTitle>
                <CardDescription>
                  {course.enrollmentCount || 0} student{(course.enrollmentCount || 0) !== 1 ? 's' : ''} enrolled
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8 text-gray-500">Loading students...</div>
                ) : enrolledStudents.length > 0 ? (
                  <div className="space-y-3">
                    {enrolledStudents.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                            {student.first_name?.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900">
                              {student.first_name} {student.last_name}
                            </p>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {student.grade ? (
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(student.grade)}`}>
                              {student.grade}
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-500">
                              No Grade
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No students enrolled yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};