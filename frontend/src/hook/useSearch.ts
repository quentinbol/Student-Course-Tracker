import { useMemo } from "react";

export const useSearch = <T extends Record<string, unknown>>(
  items: T[], 
  searchTerm: string, 
  fields: (keyof T)[]
): T[] => {
  return useMemo(() => {
    if (!searchTerm) return items;
    
    return items.filter(item => 
      fields.some(field => 
        item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [items, searchTerm, fields]);
};
