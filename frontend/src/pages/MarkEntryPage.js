import React, { useState } from 'react';
import api from '../api/api';
import FormInput from '../components/FormInput'; // Assuming FormInput is defined

const MarkEntryPage = () => {
    const [formData, setFormData] = useState({
        Id: '',
        course: '',
        courseCode: '',
        semester: 1,
        marks: '',
        grade: '',
        academicYear: '2024-2025'
    });
    const [message, setMessage] = useState('');

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setMessage('');

        try {
            await api.post('/marks', formData);
            setMessage(`Success! Marks entered for student: ${formData.Id} in ${formData.courseCode}`);
            setFormData({ // Clear most fields after success
                Id: '',
                course: '',
                courseCode: '',
                semester: formData.semester,
                marks: '',
                grade: '',
                academicYear: formData.academicYear
            });
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Failed to enter marks. Check permissions or student ID.';
            setMessage(`Error: ${errorMsg}`);
        }
    };

    return (
        <div className="max-w-xl mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold text-green-700 mb-6 border-b pb-2">Grade Submission Form</h2>
            
            <form onSubmit={onSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-4">
                <FormInput
                    label="Student ID"
                    type="text"
                    name="Id"
                    value={formData.Id}
                    onChange={onChange}
                    placeholder="e.g., 65b93478..."
                    required
                />
                <FormInput
                    label="Academic Year"
                    type="text"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={onChange}
                    required
                />
                
                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        label="Course Code"
                        type="text"
                        name="courseCode"
                        value={formData.courseCode}
                        onChange={onChange}
                        placeholder="e.g., CS101"
                        required
                    />
                    <FormInput
                        label="Course Name"
                        type="text"
                        name="course"
                        value={formData.course}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <FormInput
                        label="Semester"
                        type="number"
                        name="semester"
                        value={formData.semester}
                        onChange={onChange}
                        required
                    />
                    <FormInput
                        label="Marks (0-100)"
                        type="number"
                        name="marks"
                        value={formData.marks}
                        onChange={onChange}
                        required
                    />
                    <FormInput
                        label="Grade"
                        type="text"
                        name="grade"
                        value={formData.grade}
                        onChange={onChange}
                        placeholder="e.g., A+"
                        required
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="w-full py-3 mt-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                    Submit Student Marks
                </button>
            </form>
            {message && <p className={`text-center mt-4 p-3 rounded ${message.includes('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</p>}
        </div>
    );
};

export default MarkEntryPage;