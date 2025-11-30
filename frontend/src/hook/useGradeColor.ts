import { useCallback } from "react";

const useGradeColor = () => {
  return useCallback((grade?: string | null) => {
    if (!grade) return 'bg-gray-100 text-gray-700';
    if (grade.startsWith('A')) return 'bg-green-100 text-green-700';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-700';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-700';
    if (grade.startsWith('D')) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  }, []);
};

export default useGradeColor;
