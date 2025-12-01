import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Users, BookOpen, TrendingUp, Award } from 'lucide-react';
import type { Stats } from '../hook/useStatistics';
import { EnrollmentTrends } from '../components/graph/Enrollments';
import { StatCard } from '../components/basic/StatCard';
import { ProjectAnalytics } from '../components/graph/ProjectAnalytics';
import { GradeDistribution } from '../components/graph/GradeDistribution';
import type { Student } from '../api/student';
import type { Course } from '../api/courses';

interface DashboardViewProps {
  stats: Stats;
  students: Student[];
  courses: Course[];
}

const ModernDashboardView: React.FC<DashboardViewProps> = ({ stats, students, courses }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          change="Increased from last month"
          icon={Users}
          gradient="bg-green-800"
          textColor='text-white'
        />
        <StatCard
          title="Active Courses"
          value={stats.totalCourses}
          change="New courses added"
          icon={BookOpen}
          gradient="bg-white"
        />
        <StatCard
          title="Enrollments"
          value={stats.totalEnrollments}
          change="Increased from last month"
          icon={TrendingUp}
          gradient="bg-white"
        />
        <StatCard
          title="Average GPA"
          value={stats.averageGPA.toFixed(2)}
          change="On Discussion"
          icon={Award}
          gradient="bg-white"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectAnalytics stats={stats} />
        <GradeDistribution stats={stats} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <EnrollmentTrends stats={stats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Recent Students</CardTitle>
                <CardDescription>Latest enrolled students</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {students.slice(0, 5).map((student, index) => (
                <div 
                  key={student.id} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                      index === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                      index === 1 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                      index === 2 ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                      'bg-gradient-to-br from-orange-500 to-orange-600'
                    }`}>
                      {student.first_name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{student.first_name} {student.last_name}</p>
                      <p className="text-xs text-gray-500">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                      {student.enrollmentCount} courses
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Active Courses</CardTitle>
                <CardDescription>Currently running courses</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {courses.slice(0, 4).map((course, index) => (
                <div 
                  key={course.id} 
                  className="flex items-start justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex gap-3 flex-1">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                      index === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                      index === 1 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                      index === 2 ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                      'bg-gradient-to-br from-orange-500 to-orange-600'
                    }`}>
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{course.name}</p>
                      <p className="text-xs text-gray-500">{course.code} • {course.instructor}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(((course.enrollmentCount || 0) / 30) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 font-medium whitespace-nowrap">
                          {course.enrollmentCount} students
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ModernDashboardView;