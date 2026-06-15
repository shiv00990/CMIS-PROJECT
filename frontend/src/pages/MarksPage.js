import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import { useAuth } from '../context/useAuth';

const MarksPage = () => {
    // 1. Get user details from context
    const { userRole, userId } = useAuth(); 
    
    // Set initial state for the search ID
    // Note: 'searchId' will hold the value typed by Admin/Faculty OR the logged-in student's userId
    const [searchId, setSearchId] = useState(userRole === 'student' ? userId : ''); 
    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message,  setMessage] = useState('');

    // Function to fetch marks (Reusable for both Search and Auto-load)
    const fetchMarks = useCallback(async (idToFetch) => {
        setLoading(true);
        setMarks([]);
        setMessage('');

        if (!idToFetch) {
            setMessage('No ID provided for lookup.');
            setLoading(false);
            return;
        }

        try {
            // CRITICAL: The backend is set up to accept the Custom ID (e.g., 44110794)
            const response = await api.get(`/marks/student/${idToFetch}`);
            setMarks(response.data);
            if (response.data.length === 0) {
                 setMessage('No marks records found for this student.');
            } else {
                 setMessage('Marks retrieved successfully!');
            }
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Error fetching marks.';
            setMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    }, []);

    // 2. CRITICAL FIX: Auto-fetch for Students on page load
    useEffect(() => {
        // If the user is a student AND their MongoDB ID is available
        if (userRole === 'student' && userId) {
            fetchMarks(userId); // Student fetches their own data automatically
        }
    }, [userRole, userId, fetchMarks]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Admin/Faculty search using the ID they typed in the box
        fetchMarks(searchId);
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-2">📜 Student Academic Marks</h2>

            {/* Show Search Form ONLY for Admin/Faculty */}
            {(userRole === 'admin' || userRole === 'faculty') && (
                <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
                    <form onSubmit={handleSearch} className="flex space-x-4">
                        <input 
                            type="text" 
                            placeholder="Search by Student ID (e.g., 44110794)" 
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            required
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                        <button 
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                        >
                            Search Marks
                        </button>
                    </form>
                </div>
            )}
            {/* Display message if it's a student and no data is found */}
            {userRole === 'student' && !loading && marks.length === 0 && (
                <p className="text-center text-gray-500 mt-4 bg-gray-100 p-4 rounded-lg">No marks records found for your account yet.</p>
            )}


            {loading && <div className="text-center text-indigo-600 text-lg">Fetching results...</div>}

            {marks.length > 0 && (
                <div className="bg-white overflow-hidden shadow-xl rounded-lg border border-gray-200">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">
                            Academic Record
                            {(userRole === 'admin' || userRole === 'faculty') && <span className="text-sm font-normal text-gray-500 ml-2">(ID: {searchId})</span>}
                        </h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {marks.map((record) => (
                                    <tr key={record._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{record.courseCode}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.course}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.semester}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.academicYear}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${record.marks < 40 ? 'text-red-600' : 'text-green-600'}`}>
                                            {record.marks}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${['F', 'D'].includes(record.grade) ? 'text-red-600' : 'text-green-600'}`}>
                                            {record.grade}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarksPage;