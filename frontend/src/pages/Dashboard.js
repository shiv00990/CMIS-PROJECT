import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Dashboard = () => {
    const { userRole } = useAuth();

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                Welcome to the CMS Dashboard!
            </h2>
            <p className="text-xl text-indigo-600 mb-8">
                You are logged in as a <span className="font-bold capitalize">{userRole}</span>.
            </p>
            
            {/* FIX: Using Tailwind's grid and gap utilities for responsive columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
                <Link to="/courses" className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-indigo-500">
                    <h3 className="text-2xl font-semibold text-indigo-700 mb-2">📚 Course Details</h3>
                    <p className="text-gray-500">View all available courses and department particulars.</p>
                </Link>

                <Link to="/marks" className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-green-500">
                    <h3 className="text-2xl font-semibold text-green-700 mb-2">📊 Student Marks</h3>
                    <p className="text-gray-500">Search and display academic marks and semester grades.</p>
                </Link>

                <Link to="/fees" className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-yellow-500">
                    <h3 className="text-2xl font-semibold text-yellow-700 mb-2">💰 Fees & Billing</h3>
                    <p className="text-gray-500">Check paid fee, outstanding balance, and transaction history.</p>
                </Link>
                 {(userRole === 'faculty' ) && (
                    <Link to="/faculty" className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-red-500">
                        <h3 className="text-2xl font-semibold text-red-700 mb-2">⚙️ Faculty Tools</h3>
                        <p className="text-gray-500">courses, and record student data.</p>
                    </Link>
                )}
                {(userRole === 'admin' ) && (
                    <Link to="/admin" className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-red-500">
                        <h3 className="text-2xl font-semibold text-red-700 mb-2">⚙️ Admin Tools</h3>
                        <p className="text-gray-500">Manage user accounts, courses, and record Fee data.</p>
                    </Link>
                )}
                
               
            </div>
        </div>
    );
};

export default Dashboard;