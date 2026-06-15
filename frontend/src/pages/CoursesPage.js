import React, { useState, useEffect } from 'react';
import api from '../api/api';
import CourseCard from '../components/CourseCard';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Call the backend endpoint defined in backend/routes/courses.js
                const response = await api.get('/courses');
                setCourses(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch course details. Please check server status.');
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <div className="loading">Loading Course Catalog...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="courses-page">
            <h2>📚 Available Courses and Particulars</h2>
            <div className="course-list">
                {courses.length > 0 ? (
                    courses.map(course => (
                        <CourseCard key={course._id} course={course} />
                    ))
                ) : (
                    <p>No courses are currently listed in the system.</p>
                )}
            </div>
        </div>
    );
};

export default CoursesPage;