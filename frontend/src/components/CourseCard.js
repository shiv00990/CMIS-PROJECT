import React from 'react';

const CourseCard = ({ course }) => {
    return (
        <div className="course-card">
            <h3>{course.courseName} ({course.courseCode})</h3>
            <p><strong>Department:</strong> {course.department}</p>
            <p><strong>Credits:</strong> {course.credits}</p>
            {course.description && <p className="description">{course.description}</p>}
        </div>
    );
};

export default CourseCard;