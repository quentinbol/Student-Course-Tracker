import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Users, 
  BookOpen,
  Award,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../../components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'students', label: 'Students', icon: Users, path: '/students' },
    { id: 'courses', label: 'Courses', icon: BookOpen, path: '/courses' },
    { id: 'manage', label: 'Manage', icon: Award, path: '/manage' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64 shadow-2xl
        flex flex-col justify-between
      `}>
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Concordia</h1>
              <p className="text-xs text-gray-400">SOEN 387</p>
            </div>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white bg-transparent hover:bg-green-800 rounded-md"
          >
            <X className="h-2 w-2" />
          </Button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                  transition-all duration-200 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-white'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="border-t border-gray-700 p-4">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-700/50">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
              AT
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin Test</p>
              <p className="text-xs text-gray-400 truncate">admin@mail.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

interface LayoutWithSidebarProps {
  children: React.ReactNode;
}

export default function LayoutWithSidebar({ children }: LayoutWithSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    switch(location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/students':
        return 'Students';
      case '/courses':
        return 'Courses';
      case '/manage':
        return 'Manage';
      default:
        return 'Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch(location.pathname) {
      case '/dashboard':
        return 'Plan, prioritize, and accomplish your tasks with ease';
      case '/students':
        return 'Manage and track all student information';
      case '/courses':
        return 'View and manage course offerings';
      case '/manage':
        return 'Enroll students and assign grades';
      default:
        return 'Plan, prioritize, and accomplish your tasks with ease';
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <Sidebar 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-1.5 rounded-lg">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">Concordia</span>
            </div>
            <div className="w-6" />
          </div>
        </header>
        <header className="hidden lg:block bg-white border-b border-gray-200 shadow-sm">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                  {getPageTitle()}
                </h2>
                <p className="text-sm text-gray-500">
                  {getPageSubtitle()}
                </p>
              </div>
              <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">
                Fall 2025
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}