import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader2, AlertCircle, Check } from "lucide-react";
import type { Course } from "../../api/courses";
import type { Student } from "../../api/student";
import type { Enrollment } from "../../api/enrollments";
import type { GradeForm as GradeFormType } from "../../hook/useGradeManager";
import { useMemo } from "react";
import useGradeColor from "../../hook/useGradeColor";

interface GradeFormProps {
  students: Student[];
  courses: Course[];
  enrollments: Enrollment[];
  gradeForm: GradeFormType;
  setGradeForm: (form: GradeFormType) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const GradeForm: React.FC<GradeFormProps> = ({ 
  students, 
  courses,
  enrollments,
  gradeForm, 
  setGradeForm, 
  onSubmit, 
  isLoading 
}) => {
  const gradeOptions = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];

  const getGradeColor = useGradeColor();

  const enrolledCourses = useMemo(() => {
    if (!gradeForm.studentId) return [];
    
    const studentId = parseInt(gradeForm.studentId);
    const selectedStudent = students.find(s => s.id === studentId);
    
    if (selectedStudent?.enrollments) {
      return selectedStudent.enrollments.map(e => e.course);
    }
  
    const studentEnrollments = enrollments.filter(e => e.student_id === studentId);
    return courses.filter(course => 
      studentEnrollments.some(e => e.course_id === course.id)
    );
  }, [gradeForm.studentId, students, enrollments, courses]);

  const handleStudentChange = (value: string) => {
    setGradeForm({
      ...gradeForm,
      studentId: value,
      courseId: '',
    });
  };

  const isFormValid = gradeForm.studentId && gradeForm.courseId && gradeForm.grade;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Student
        </Label>
        <Select 
          value={gradeForm.studentId} 
          onValueChange={handleStudentChange}
        >
          <SelectTrigger className="h-14 bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all">
            <SelectValue placeholder="Select a student" />
          </SelectTrigger>
          <SelectContent>
            {students.map(s => (
              <SelectItem 
                key={s.id} 
                value={s.id.toString()}
                className="cursor-pointer"
              >
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                    {s.first_name?.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{s.first_name} {s.last_name}</div>
                    <div className="text-xs text-gray-500">{s.email}</div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {gradeForm.studentId && (
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Check className="h-3 w-3 text-green-600" />
            Student selected
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Course
        </Label>
        <Select 
          value={gradeForm.courseId} 
          onValueChange={(value) => setGradeForm({...gradeForm, courseId: value})}
          disabled={!gradeForm.studentId || enrolledCourses.length === 0}
        >
          <SelectTrigger className="h-14 bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all">
            <SelectValue placeholder={
              !gradeForm.studentId 
                ? "Select a student first" 
                : enrolledCourses.length === 0 
                ? "No enrolled courses" 
                : "Select a course"
            } />
          </SelectTrigger>
          <SelectContent>
            {courses.map(c => (
              <SelectItem 
                key={c.id} 
                value={c.id.toString()}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-semibold">
                    {c.code}
                  </div>
                  <span className="font-medium">{c.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {gradeForm.courseId && (
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Check className="h-3 w-3 text-green-600" />
            Course selected
          </p>
        )}
        {gradeForm.studentId && enrolledCourses.length === 0 && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-medium">No courses found</p>
              <p className="text-amber-700 mt-1">
                This student is not enrolled in any courses yet. Please enroll them first.
              </p>
            </div>
          </div>
        )}
        {gradeForm.studentId && enrolledCourses.length > 0 && (
          <p className="text-xs text-gray-500">
            Student is enrolled in {enrolledCourses.length} course{enrolledCourses.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Grade
        </Label>
        <Select 
          value={gradeForm.grade} 
          onValueChange={(value) => setGradeForm({...gradeForm, grade: value})}
          disabled={!gradeForm.courseId}
        >
          <SelectTrigger className="h-14 bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all">
            <SelectValue placeholder="Select a grade" />
          </SelectTrigger>
          <SelectContent>
            {gradeOptions.map(grade => (
              <SelectItem key={grade} value={grade}>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(grade)}`}>
                  {grade}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {gradeForm.grade && (
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Check className="h-3 w-3 text-green-600" />
            Grade selected
          </p>
        )}
      </div>
      <Button 
        onClick={onSubmit}
        disabled={isLoading || !gradeForm.studentId || !gradeForm.courseId || !gradeForm.grade}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Assign Grade'}
      </Button>

      {isFormValid && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            Ready to grade{' '}
            <span className="font-semibold">
              {students.find(s => s.id.toString() === gradeForm.studentId)?.first_name}
            </span>
            {' '}in course{' '}
            <span className="font-semibold">
              {courses.find(c => c.id.toString() === gradeForm.courseId)?.code}
            </span>
            {' '}with grade{' '}
            <span className={`px-2 py-1 rounded-full text-sm font-semibold ${getGradeColor(gradeForm.grade || '')} inline-block`}>
              {gradeForm.grade}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};