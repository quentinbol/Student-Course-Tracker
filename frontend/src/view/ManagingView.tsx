import type { Course } from "../api/courses";
import type { Student } from "../api/student";
import { EnrollForm } from "../components/form/EnrollForm";
import { GradeForm } from "../components/form/GradeForm";
import type { EnrollForm as EnrollFormType } from "../hook/useEnrollmentManager";
import type { GradeForm as GradeFormType } from "../hook/useGradeManager";

interface ManageViewProps {
  students: Student[];
  courses: Course[];
  enrollForm: EnrollFormType;
  setEnrollForm: (form: EnrollFormType) => void;
  gradeForm: GradeFormType;
  setGradeForm: (form: GradeFormType) => void;
  onEnroll: () => void;
  onGrade: () => void;
  enrolling: boolean;
  recording: boolean;
}

export const ManageView: React.FC<ManageViewProps> = ({ 
  students, 
  courses, 
  enrollForm, 
  setEnrollForm, 
  gradeForm, 
  setGradeForm, 
  onEnroll, 
  onGrade, 
  enrolling, 
  recording 
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <EnrollForm
      students={students}
      courses={courses}
      enrollForm={enrollForm}
      setEnrollForm={setEnrollForm}
      onSubmit={onEnroll}
      isLoading={enrolling}
    />
    <GradeForm
      students={students}
      courses={courses}
      gradeForm={gradeForm}
      setGradeForm={setGradeForm}
      onSubmit={onGrade}
      isLoading={recording}
    />
  </div>
);