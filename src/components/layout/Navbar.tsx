import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            className="lg:hidden text-gray-500 hover:text-gray-600 p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold text-blue-600 ml-2 sm:ml-0">
            {currentUser?.role === 'admin' ? 'Admin Dashboard' : 'Student Portal'}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {currentUser && (
            <>
              <div className="hidden sm:block text-sm text-gray-700">
                Welcome, <span className="font-medium">{currentUser.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center"
              >
                <LogOut size={16} className="mr-1" />
                <span>Logout</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;