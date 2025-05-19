import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  login: (studentIdOrEmail: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  userRole: UserRole | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setUserRole(user.role);
    }
  }, []);

  const login = async (studentIdOrEmail: string, password: string): Promise<boolean> => {
    // Simple mock authentication
    try {
      // In a real app, you would call an API here
      const user = mockUsers.find(
        (user) => (user.email === studentIdOrEmail || user.studentId === studentIdOrEmail) && password === 'password'
      );

      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        setUserRole(user.role);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};