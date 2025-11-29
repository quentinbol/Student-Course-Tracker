import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Users, BookOpen, GraduationCap, Award } from 'lucide-react';
import { StatCard } from '../components/basic/StatCard';
import type { Student } from '../api/student';
import type { Course } from '../api/courses';

interface Statistics {
  totalStudents: number;
  totalCourses: number;
  totalEnrollments: number;
  averageGrade: string;
}

interface DashboardViewProps {
  stats: Statistics;
  students: Student[];
  courses: Course[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({ stats, students, courses }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Total Students" 
        value={stats.totalStudents} 
        icon={Users}
        gradient="bg-gradient-to-br from-blue-500 to-blue-600"
      />
      <StatCard 
        title="Total Courses" 
        value={stats.totalCourses} 
        icon={BookOpen}
        gradient="bg-gradient-to-br from-purple-500 to-purple-600"
      />
      <StatCard 
        title="Enrollments" 
        value={stats.totalEnrollments} 
        icon={GraduationCap}
        gradient="bg-gradient-to-br from-green-500 to-green-600"
      />
      <StatCard 
        title="Average Grade" 
        value={stats.averageGrade} 
        icon={Award}
        gradient="bg-gradient-to-br from-orange-500 to-orange-600"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Students</CardTitle>
          <CardDescription>Latest enrolled students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.slice(0, 4).map(student => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                    {student.first_name?.split(' ').map(n => n[0]).join('') || '?'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{student.first_name}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {student.enrollmentCount} courses
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Courses</CardTitle>
          <CardDescription>Currently running courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.slice(0, 4).map(course => (
              <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{course.name}</p>
                  <p className="text-sm text-gray-500">{course.code} • {course.instructor}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {course.enrollmentCount} students
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);