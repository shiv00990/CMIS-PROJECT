import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import MarksPage from './pages/MarksPage';
import CoursesPage from './pages/CoursesPage';
import FeesPage from './pages/FeesPage';
import StudentPage from './pages/StudentPage'; 
import AdminPage from './pages/AdminPage'; // <- import your Admin page
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import FacultyPage from './pages/FacultyPage';
import UserManagement from './pages/UserManagement'; 
import CourseManagement from './pages/CourseManagement';
import FeeManagement from './pages/FeeManagement';
import MarkEntryPage from './pages/MarkEntryPage'; 

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          {/* Public */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected (any authenticated user) */}
          <Route element={<ProtectedRoute allowedRoles={['student','faculty','admin']} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<CoursesPage />} />
          </Route>

          {/* Role-based protected (student/admin/faculty) */}
          <Route element={<ProtectedRoute allowedRoles={['student','faculty','admin']} />}>
            <Route path="/marks" element={<MarksPage />} />
            <Route path="/fees" element={<FeesPage />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/courses" element={<CoursesPage />} />
          </Route>

          {/* Admin-only */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminPage />} />
            {/* Admin Management Sub-Pages */}
                        <Route path="/admin/users" element={<UserManagement />} />
                        <Route path="/admin/courses" element={<CourseManagement />} /> 
                        <Route path="/admin/fees" element={<FeeManagement />} />
          </Route>
            {/* Faculty-only */}
            <Route element={<ProtectedRoute allowedRoles={['faculty']} />}>
                <Route path="/Faculty" element={<FacultyPage />} />     
                <Route path="/faculty/markentry" element={<MarkEntryPage />} />      
                <Route path="/faculty/courses" element={<CoursesPage />} /> 
            </Route>
          
          {/* Catch-all: redirect unknown routes to dashboard (or login) */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
