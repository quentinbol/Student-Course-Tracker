import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Award, Loader2 } from "lucide-react";
import type { Course } from "../../api/courses";
import type { Student } from "../../api/student";
import type { GradeForm as GradeFormType } from "../../hook/useGradeManager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface GradeFormProps {
  students: Student[];
  courses: Course[];
  gradeForm: GradeFormType;
  setGradeForm: (form: GradeFormType) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const GradeForm: React.FC<GradeFormProps> = ({ 
  students, 
  courses, 
  gradeForm, 
  setGradeForm, 
  onSubmit, 
  isLoading 
}) => {
  const gradeOptions = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Award className="h-5 w-5" />
          <span>Assign Grade</span>
        </CardTitle>
        <CardDescription>Record a grade for a student</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Student</Label>
            <Select 
              value={gradeForm.studentId} 
              onValueChange={(value) => setGradeForm({...gradeForm, studentId: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent>
                {students.map(s => (
                  <SelectItem key={s.id} value={s.id.toString()}>{s.first_name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Course</Label>
            <Select 
              value={gradeForm.courseId} 
              onValueChange={(value) => setGradeForm({...gradeForm, courseId: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map(c => (
                  <SelectItem key={c.id} value={c.id.toString()}>{c.code} - {c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Grade</Label>
            <Select 
              value={gradeForm.grade} 
              onValueChange={(value) => setGradeForm({...gradeForm, grade: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a grade" />
              </SelectTrigger>
              <SelectContent>
                {gradeOptions.map(grade => (
                  <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={onSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Assign Grade'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
