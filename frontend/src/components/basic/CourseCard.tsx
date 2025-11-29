import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { BookOpen } from 'lucide-react';
import type { Course } from '../../api/courses';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <CardTitle className="text-xl">{course.name}</CardTitle>
          <CardDescription className="text-base">{course.code}</CardDescription>
        </div>
        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-white" />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Instructor</span>
          <span className="font-medium">{course.instructor}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Enrolled Students</span>
          <span className="font-semibold text-purple-600">{course.enrollmentCount}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);