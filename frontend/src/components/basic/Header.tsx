import { GraduationCap } from 'lucide-react';

export const Header = () => (
  <header className="bg-white border-b border-gray-200 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Course Tracker</h1>
            <p className="text-sm text-gray-500">Concordia University - SOEN 387</p>
          </div>
        </div>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          Fall 2025
        </div>
      </div>
    </div>
  </header>
);