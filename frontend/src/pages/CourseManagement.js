import React, { useState, useEffect } from 'react';
import api from '../api/api';
import FormInput from '../components/FormInput';
import CourseCard from '../components/CourseCard'; // Reusing the card component

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        courseName: '',
        courseCode: '',
        description: '',
        credits: 3,
        department: ''
    });

    const fetchCourses = async () => {
        try {
            const response = await api.get('/courses');
            setCourses(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch course details.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setMessage('');
        try {
            await api.post('/courses', formData);
            setMessage(`Course ${formData.courseCode} added successfully!`);
            setFormData({ courseName: '', courseCode: '', description: '', credits: 3, department: '' });
            fetchCourses(); // Refresh list
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Error adding course. Check code uniqueness.';
            setMessage(`Error: ${errorMsg}`);
        }
    };

    if (loading) {
        return <div className="text-center py-10 text-lg text-indigo-500">Loading Course Management Dashboard...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-indigo-700 mb-8 border-b pb-2">Course Management</h2>

            {/* Course Addition Form */}
            <div className="mb-12 p-6 bg-white rounded-xl shadow-lg border-t-4 border-indigo-500">
                <h3 className="text-2xl font-semibold mb-4">Add New Course</h3>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput label="Course Name" name="courseName" value={formData.courseName} onChange={onChange} required type="text" />
                        <FormInput label="Course Code" name="courseCode" value={formData.courseCode} onChange={onChange} required type="text" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <FormInput label="Credits" name="credits" value={formData.credits} onChange={onChange} required type="number" min="1" />
                        <FormInput label="Department" name="department" value={formData.department} onChange={onChange} required type="text" />
                        <FormInput label="Description" name="description" value={formData.description} onChange={onChange} type="text" />
                    </div>
                    <button 
                        type="submit" 
                        className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                    >
                        Create Course
                    </button>
                </form>
                {message && <p className={`mt-4 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</p>}
            </div>

            {/* Existing Course List */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Existing Courses ({courses.length})</h3>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <CourseCard key={course._id} course={course} />
                ))}
            </div>
        </div>
    );
};

export default CourseManagement;