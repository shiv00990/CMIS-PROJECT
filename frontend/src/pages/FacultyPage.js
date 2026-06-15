import React from 'react';
import { Link } from 'react-router-dom';

const FacultyPage = () => {
    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-indigo-700 mb-8 border-b pb-2">👨‍🏫 Faculty Portal</h2>
            <p className="text-xl text-gray-700 mb-6">
                Welcome Professor. Use this portal to manage your courses and student academic results.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Marks Entry - The main administrative task for faculty */}
                 <Link 
                     to="/faculty/markentry" 
                     className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-green-500"
                 >
                    <h3 className="text-2xl font-semibold text-green-700 mb-2">Grade Submission & Editing</h3>
                    <p className="text-gray-500">Enter and update marks for students in your assigned courses.</p>
                 </Link>

                {/* Course View - Faculty needs to see the course structure */}
                <Link 
                    to="/faculty/courses" 
                    className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-blue-500"
                >
                    <h3 className="text-2xl font-semibold text-blue-700 mb-2">View Course Catalog</h3>
                    <p className="text-gray-500">Review all courses and specific section details for teaching preparation.</p>
                </Link>
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-800 mt-12 mb-4 border-b pb-1">Student Data Access</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Direct link to Marks viewing page */}
                 <Link 
                     to="/marks" 
                     className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 border-l-4 border-gray-400"
                 >
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Search Student Results</h3>
                    <p className="text-sm text-gray-500">Look up marks for any student using their ID or email.</p>
                 </Link>
            </div>
        </div>
    );
};

export default FacultyPage;