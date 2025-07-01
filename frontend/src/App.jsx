import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Results from './pages/Results';
import AdminPanel from './pages/AdminPanel';
import ManageStudents from './pages/ManageStudents';
import ManageModules from './pages/ManageModules';
import ManageResults from './pages/ManageResults';
import ManageCourses from './pages/ManageCourses';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/results" element={<Results />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin/students" element={<ManageStudents />} />
      <Route path="/admin/modules" element={<ManageModules />} />
      <Route path="/admin/results" element={<ManageResults />} />
      <Route path="/admin/courses" element={<ManageCourses />} />
    </Routes>
  );
}

export default App;
