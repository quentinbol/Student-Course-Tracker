import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import type { EnrichedStudent } from '../../hook/useEnrichedData';


interface StudentCardProps {
  student: EnrichedStudent;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student }) => (
  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
    <CardHeader>
      <div className="flex items-center space-x-3">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
          {student.name?.split(' ').map(n => n[0]).join('') || '?'}
        </div>
        <div>
          <CardTitle className="text-lg">{student.name}</CardTitle>
          <CardDescription>{student.email}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Enrolled in</span>
        <span className="font-semibold text-blue-600">{student.enrollmentCount} courses</span>
      </div>
    </CardContent>
  </Card>
);