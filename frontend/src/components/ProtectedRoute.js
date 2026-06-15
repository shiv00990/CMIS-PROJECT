import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../context/useAuth';
const ProtectedRoute = ({ allowedRoles = ['student', 'admin', 'faculty'] }) => {
    const { isAuthenticated, userRole, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;