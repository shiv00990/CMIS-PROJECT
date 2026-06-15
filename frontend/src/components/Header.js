import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Header = () => {
    const { isAuthenticated, userRole, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center w-full">
                {/* Logo and App Title */}
                <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-2xl font-bold text-indigo-600">
                    CMS Portal
                </Link>

                {/* Navigation Links and Logout Button */}
                <div className="flex space-x-6 items-center">
                    {isAuthenticated ? (
                        <>
                            {/* Primary Navigation Links */}
                            <div className="flex space-x-6">
                                <Link to="/courses" className="text-gray-700 hover:text-indigo-600 transition duration-150 font-medium">Courses</Link>
                                <Link to="/marks" className="text-gray-700 hover:text-indigo-600 transition duration-150 font-medium">Marks</Link>
                                <Link to="/fees" className="text-gray-700 hover:text-indigo-600 transition duration-150 font-medium">Fees</Link>
                                {userRole === 'admin' && (
                                    <Link to="/admin" className="text-red-500 hover:text-red-700 transition duration-150 font-bold">Admin</Link>
                                )}
                            </div>
                            
                            {/* Logout Button */}
                            <button 
                                onClick={handleLogout} 
                                className="px-4 py-1 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium">Login</Link>
                            <Link to="/register" className="px-4 py-1 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition duration-300">Register</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;