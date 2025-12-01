import React, { useState, useMemo } from "react";
import { SearchBar } from "../components/basic/SearchBar";
import type { Student } from "../api/student";
import type { Course } from "../api/courses";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { StudentDetailDialog } from "../components/dialog/StudentDetailDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Filter, X } from "lucide-react";
import { Button } from "../components/ui/button";

interface StudentsViewProps {
  students: Student[];
  courses: Course[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({ students, courses, searchTerm, setSearchTerm }) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>("all");

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const filteredStudents = useMemo(() => {
    if (selectedCourseFilter === "all") {
      return students;
    }

    const courseId = parseInt(selectedCourseFilter);
    return students.filter(student => 
      student.enrollments?.some(enrollment => enrollment.course.id === courseId)
    );
  }, [students, selectedCourseFilter]);

  const clearFilters = () => {
    setSelectedCourseFilter("all");
    setSearchTerm("");
  };

  const hasActiveFilters = selectedCourseFilter !== "all" || searchTerm !== "";

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar 
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search students..."
            />
          </div>
          
          <div className="flex gap-3">
            <div className="w-full sm:w-64">
              <Select value={selectedCourseFilter} onValueChange={setSelectedCourseFilter}>
                <SelectTrigger className="bg-white">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filter by course" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map(course => (
                    <SelectItem key={course.id} value={course.id.toString()}>
                      {course.code} - {course.name.length > 20 ? course.name.slice(0, 20) + "..." : course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {hasActiveFilters && (
              <Button
                onClick={clearFilters}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            )}
          </div>
        </div>
        {selectedCourseFilter !== "all" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  Showing students enrolled in: <span className="font-bold">
                    {courses.find(c => c.id === parseInt(selectedCourseFilter))?.name}
                  </span>
                </span>
              </div>
              <span className="text-sm text-blue-700 font-semibold">
                {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}
        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student, index) => (
              <Card 
                key={student.id} 
                className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
                onClick={() => handleStudentClick(student)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      index % 4 === 0 ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                      index % 4 === 1 ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                      index % 4 === 2 ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' :
                      'bg-gradient-to-br from-orange-400 to-orange-600'
                    }`}>
                      {student.first_name?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">
                        {student.first_name} {student.last_name}
                      </CardTitle>
                      <CardDescription className="truncate">{student.email}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Enrolled in</span>
                    <span className="font-semibold text-blue-600">{student.enrollmentCount || 0} courses</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Filter className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-500 mb-4">
              {selectedCourseFilter !== "all" 
                ? "No students are enrolled in this course yet."
                : "Try adjusting your search criteria."
              }
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      <StudentDetailDialog 
        student={selectedStudent}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};