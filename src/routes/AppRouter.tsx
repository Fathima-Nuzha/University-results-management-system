import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Layouts
import Layout from '../components/layout/Layout';

// Public Pages
import Home from '../pages/Home';
import Login from '../pages/Login';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import FacultiesPage from '../pages/admin/Faculties';
import CoursesPage from '../pages/admin/Courses';
import StudentsPage from '../pages/admin/Students';
import ResultsPage from '../pages/admin/Results';

// Student Pages
import StudentDashboard from '../pages/student/Dashboard';
import StudentResults from '../pages/student/Results';

// Protected Routes component
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles: string[];
}> = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="faculties" element={<FacultiesPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="results" element={<ResultsPage />} />
          </Route>

          {/* Student Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="results" element={<StudentResults />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;