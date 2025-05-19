import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, BookOpen, GraduationCap, Home, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const { userRole } = useAuth();
  
  const adminLinks = [
    { to: '/admin', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/admin/faculties', icon: <BookOpen size={20} />, label: 'Faculties' },
    { to: '/admin/courses', icon: <BarChart3 size={20} />, label: 'Courses' },
    { to: '/admin/students', icon: <Users size={20} />, label: 'Students' },
    { to: '/admin/results', icon: <GraduationCap size={20} />, label: 'Results' },
  ];

  const studentLinks = [
    { to: '/student', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/student/results', icon: <GraduationCap size={20} />, label: 'My Results' },
  ];

  const links = userRole === 'admin' ? adminLinks : studentLinks;

  return (
    <div
      className={`fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 pt-16 transition-transform duration-300 ease-in-out transform ${
        open ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/admin' || link.to === '/student'}
                className={({ isActive }) =>
                  `flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 ${
                    isActive ? 'bg-blue-50 text-blue-700 font-medium' : ''
                  }`
                }
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;