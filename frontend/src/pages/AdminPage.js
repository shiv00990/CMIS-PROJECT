import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-red-700 mb-8 border-b pb-2">⚙️ Administrator Control Panel</h2>
            <p className="text-xl text-gray-700 mb-6">
                Welcome Admin. You have full access to manage system users, finances, and academic structures.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 
                 {/* 1. User Management Link (CRITICAL: For changing roles) */}
                 <Link to="/admin/users" className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-red-500">
                    <h3 className="text-2xl font-semibold text-red-700 mb-2">User & Role Management</h3>
                    <p className="text-gray-500">Search users, change roles (Student, Faculty, Admin), and manage accounts.</p>
                 </Link>

                {/* 2. Fee Management Link (CRITICAL: For financial records) */}
                <Link to="/admin/fees" className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-yellow-500">
                    <h3 className="text-2xl font-semibold text-yellow-700 mb-2">Fee Processing</h3>
                    <p className="text-gray-500">Process new payments and create initial fee records for students.</p>
                </Link>
                
                {/* 3. Course Management Link (CRITICAL: For adding/deleting courses) */}
                <Link to="/admin/courses" className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-indigo-500">
                    <h3 className="text-2xl font-semibold text-indigo-700 mb-2">Course Structure</h3>
                    <p className="text-gray-500">Add or modify degree programs and course details system-wide.</p>
                </Link>

                
            </div>
        </div>
    );
};

export default AdminPage;