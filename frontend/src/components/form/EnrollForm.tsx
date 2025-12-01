import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader2, Check } from "lucide-react";
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
}) => {
  const isFormValid = enrollForm.studentId && enrollForm.courseId;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Student
        </Label>
        <Select 
          value={enrollForm.studentId} 
          onValueChange={(value) => setEnrollForm({...enrollForm, studentId: value})}
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
        {enrollForm.studentId && (
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
          value={enrollForm.courseId} 
          onValueChange={(value) => setEnrollForm({...enrollForm, courseId: value})}
        >
          <SelectTrigger className="h-14 bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all">
            <SelectValue placeholder="Select a course" />
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
        {enrollForm.courseId && (
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Check className="h-3 w-3 text-green-600" />
            Course selected
          </p>
        )}
      </div>

      <Button 
        onClick={onSubmit}
        disabled={isLoading || !isFormValid}
        className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Enrolling...
          </>
        ) : (
          <>
            <Check className="h-4 w-4 mr-2" />
            Enroll Student
          </>
        )}
      </Button>

      {isFormValid && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            Ready to enroll{' '}
            <span className="font-semibold">
              {students.find(s => s.id.toString() === enrollForm.studentId)?.first_name}
            </span>
            {' '}in{' '}
            <span className="font-semibold">
              {courses.find(c => c.id.toString() === enrollForm.courseId)?.code}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};