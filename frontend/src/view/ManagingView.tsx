import { useState } from "react";
import type { Course } from "../api/courses";
import type { Student } from "../api/student";
import type { Enrollment } from "../api/enrollments";
import { EnrollForm } from "../components/form/EnrollForm";
import { GradeForm } from "../components/form/GradeForm";
import type { EnrollForm as EnrollFormType } from "../hook/useEnrollmentManager";
import type { GradeForm as GradeFormType } from "../hook/useGradeManager";
import { Card } from "../components/ui/card";
import { UserPlus, Award } from "lucide-react";

interface ManageViewProps {
  students: Student[];
  courses: Course[];
  enrollments: Enrollment[];
  enrollForm: EnrollFormType;
  setEnrollForm: (form: EnrollFormType) => void;
  gradeForm: GradeFormType;
  setGradeForm: (form: GradeFormType) => void;
  onEnroll: () => void;
  onGrade: () => void;
  enrolling: boolean;
  recording: boolean;
}

type TabType = 'enroll' | 'grade';

export const ManageView: React.FC<ManageViewProps> = ({ 
  students, 
  courses,
  enrollments,
  enrollForm, 
  setEnrollForm, 
  gradeForm, 
  setGradeForm, 
  onEnroll, 
  onGrade, 
  enrolling, 
  recording 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('enroll');

  const tabs = [
    { id: 'enroll' as TabType, label: 'Enroll Student', icon: UserPlus },
    { id: 'grade' as TabType, label: 'Assign Grade', icon: Award },
  ];

  return (
    <div className="mx-auto">
      <Card className="border-2 border-gray-200 shadow-xl overflow-hidden">
        <div className="border-b border-gray-200 bg-white">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1 flex items-center justify-center gap-2 px-6 py-4
                    font-medium text-sm transition-all duration-200
                    border-b-2 relative
                    ${isActive 
                      ? 'border-green-600 text-green-600 bg-green-50/50' 
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                  <span>{tab.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6 bg-white">
          {activeTab === 'enroll' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Enroll a Student
                </h3>
                <p className="text-sm text-gray-500">
                  Add a student to a course to start tracking their progress
                </p>
              </div>
              <EnrollForm
                students={students}
                courses={courses}
                enrollForm={enrollForm}
                setEnrollForm={setEnrollForm}
                onSubmit={onEnroll}
                isLoading={enrolling}
              />
            </div>
          )}

          {activeTab === 'grade' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Assign a Grade
                </h3>
                <p className="text-sm text-gray-500">
                  Record grades for students in their enrolled courses
                </p>
              </div>
              <GradeForm
                students={students}
                courses={courses}
                enrollments={enrollments}
                gradeForm={gradeForm}
                setGradeForm={setGradeForm}
                onSubmit={onGrade}
                isLoading={recording}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};