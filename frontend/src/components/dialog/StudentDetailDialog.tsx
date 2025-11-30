import React from 'react';
import { X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { BookOpen, Award, Mail, GraduationCap } from 'lucide-react';
import type { Student } from '../../api/student';
import type { Enrollment } from '../../api/enrollments';
import type { Course } from '../../api/courses';
import { useStatistics } from '../../hook/useStatistics';
import useGradeColor from '../../hook/useGradeColor';

interface StudentDetailDialogProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentDetailDialog: React.FC<StudentDetailDialogProps> = ({ student, isOpen, onClose }) => {
  const coursesForStudent: Course[] = (student?.enrollments || []).map(e => e.course);
  const enrollmentsForStudent: Enrollment[] = (student?.enrollments || []).map(e => ({
    id: e.id,
    student_id: student ? student.id : 0,
    course_id: e.course.id,
    grade: e.grade,
    created_at: undefined,
  }));

  const { averageGPA } = useStatistics(student ? [student] : [], coursesForStudent, enrollmentsForStudent);
  const getGradeColor = useGradeColor();

  if (!student) return null;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      <div className={`
        fixed top-0 right-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                {student.first_name?.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {student.first_name} {student.last_name}
                </h2>
                <p className="flex items-center gap-2 mt-1 text-gray-500">
                  <Mail className="h-4 w-4" />
                  {student.email}
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
                  <CardDescription className="text-sm font-medium">Total Courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{student.enrollmentCount || 0}</span>
                    <BookOpen className="h-8 w-8 text-blue-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="text-sm font-medium">GPA</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{averageGPA || 0}</span>
                    <Award className="h-8 w-8 text-green-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="text-sm font-medium">Status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-green-600">Active</span>
                    <GraduationCap className="h-8 w-8 text-purple-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Enrolled Courses
                </CardTitle>
                <CardDescription>
                  {student.enrollmentCount || 0} course{(student.enrollmentCount || 0) !== 1 ? 's' : ''} enrolled
                </CardDescription>
              </CardHeader>
              <CardContent>
                {student.enrollments && student.enrollments.length > 0 ? (
                  <div className="space-y-3">
                    {student.enrollments.map((enrollment) => (
                      <div
                        key={enrollment.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">
                              {enrollment.course.name}
                            </p>
                            <p className="text-sm text-gray-500">{enrollment.course.code}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {enrollment.grade ? (
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(enrollment.grade)}`}>
                              {enrollment.grade}
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
                    <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No courses enrolled yet</p>
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