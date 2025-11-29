import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus, Loader2 } from "lucide-react";
import type { Course } from "../../api/courses";
import type { Student } from "../../api/student";
import type { EnrollForm as EnrollFormType} from "../../hook/useEnrollmentManager";

interface EnrollFormProps {
  students: Student[];
  courses: Course[];
  enrollForm: EnrollFormType;
  setEnrollForm: (form: EnrollFormType) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const EnrollForm: React.FC<EnrollFormProps> = ({ 
  students, 
  courses, 
  enrollForm, 
  setEnrollForm, 
  onSubmit, 
  isLoading 
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <Plus className="h-5 w-5" />
        <span>Enroll Student</span>
      </CardTitle>
      <CardDescription>Add a student to a course</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Student</Label>
          <Select 
            value={enrollForm.studentId} 
            onValueChange={(value) => setEnrollForm({...enrollForm, studentId: value})}
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
            value={enrollForm.courseId} 
            onValueChange={(value) => setEnrollForm({...enrollForm, courseId: value})}
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

        <Button 
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enroll Student'}
        </Button>
      </div>
    </CardContent>
  </Card>
);