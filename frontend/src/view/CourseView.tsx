import type { Course } from "../api/courses";
import { CourseCard } from "../components/basic/CourseCard";
import { SearchBar } from "../components/basic/SearchBar";

interface CoursesViewProps {
  courses: Course[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ courses, searchTerm, setSearchTerm }) => (
  <div className="space-y-6">
    <SearchBar 
      value={searchTerm}
      onChange={setSearchTerm}
      placeholder="Rechercher un cours..."
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  </div>
);