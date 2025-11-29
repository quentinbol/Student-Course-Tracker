import React from "react";
import { StudentCard } from "../components/basic/StudentCard";
import { SearchBar } from "../components/basic/SearchBar";
import type { Student } from "../api/student";

interface StudentsViewProps {
  students: Student[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({ students, searchTerm, setSearchTerm }) => (
  <div className="space-y-6">
    <SearchBar 
      value={searchTerm}
      onChange={setSearchTerm}
      placeholder="Search..."
    />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map(student => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  </div>
);