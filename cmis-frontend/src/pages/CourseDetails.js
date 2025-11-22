
import React, { useState, useEffect } from 'react';

const CourseDetails = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('/api/v1/courses');
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const data = await response.json();
                setCourses(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                alert('Error loading course details. Please try refreshing.');
                setLoading(false);
            }
        };

        fetchCourses();
    }, []); 
    return (
        <div className="course-details-container">
            <h1>📚 Course Details</h1>
            <p>This module displays all the courses and its particulars. </p>
            {loading ? (
                <p>Loading course information...</p>
            ) : courses.length === 0 ? (
                <p>No courses found in the database.</p>
            ) : (
                <table className="course-table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Title</th>
                            <th>Credits</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            <tr key={course._id}>
                                <td>{course.courseCode}</td>
                                <td>{course.courseTitle}</td>
                                <td>{course.credits}</td>
                                <td>{course.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CourseDetails;