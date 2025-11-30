import React, { useState } from "react";
import type { Course } from "../api/courses";
import { SearchBar } from "../components/basic/SearchBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { BookOpen } from "lucide-react";
import { CourseDetailDialog } from "../components/dialog/CourseDetailDialog";

interface CoursesViewProps {
  courses: Course[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ courses, searchTerm, setSearchTerm }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        <SearchBar 
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search courses..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course, index) => (
            <Card 
              key={course.id} 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
              onClick={() => handleCourseClick(course)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl truncate">{course.name}</CardTitle>
                    <CardDescription className="text-base">{course.code}</CardDescription>
                  </div>
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                    index % 4 === 0 ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                    index % 4 === 1 ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                    index % 4 === 2 ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' :
                    'bg-gradient-to-br from-orange-400 to-orange-600'
                  }`}>
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Instructor</span>
                    <span className="font-medium truncate ml-2">{course.instructor}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Enrolled Students</span>
                    <span className={`font-semibold ${
                      index % 4 === 0 ? 'text-blue-600' :
                      index % 4 === 1 ? 'text-purple-600' :
                      index % 4 === 2 ? 'text-emerald-600' :
                      'text-orange-600'
                    }`}>
                      {course.enrollmentCount || 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <CourseDetailDialog 
        course={selectedCourse}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};