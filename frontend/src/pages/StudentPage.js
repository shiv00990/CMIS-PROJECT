import React from 'react';
import { Link } from 'react-router-dom';

const StudentPage = () => {
    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-2">🎓 Student Dashboard</h2>
            <p className="text-xl text-indigo-600 mb-6">
                Access your academic and financial records here.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Marks View */}
                 <Link to="/marks" className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-green-500">
                    <h3 className="text-2xl font-semibold text-green-700 mb-2">My Grades</h3>
                    <p className="text-gray-500">View your marks and academic results for all semesters.</p>
                </Link>

                {/* Fees View */}
                <Link to="/fees" className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-yellow-500">
                    <h3 className="text-2xl font-semibold text-yellow-700 mb-2">Fee Status</h3>
                    <p className="text-gray-500">Check total fees, paid amount, and outstanding balance.</p>
                </Link>
                
                {/* Courses View */}
                <Link to="/courses" className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-blue-500">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-2">Course Catalog</h3>
                    <p className="text-gray-500">Browse detailed information on all available courses.</p>
                </Link>
            </div>
        </div>
    );
};

export default StudentPage;