import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- Inline Definitions to resolve import errors ---

// Define API locally if file is missing in context
const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Define FormInput component locally
const FormInput = ({ label, type, name, value, onChange, required = false, minLength, placeholder, error }) => {
    return (
        <div className="mb-4">
            {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                minLength={minLength}
                placeholder={placeholder || label}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'}`}
            />
            {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
        </div>
    );
};

// --- Main Component ---

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        Name: '',    
        email: '', 
        role:'',
        Id: '', 
        password: '', 
        confirmPassword: '' 
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const { Name, email, role,Id, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setMessage('');

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            setMessage('Password must be at least 6 characters long');
            return;
        }

        try {
            // Sending studentId along with other data
            await api.post('/auth/register', {
                Name,
                email, 
                role,
                Id, 
                password, 
                confirmPassword 
            });
            setMessage('Registration successful! Please login.');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Registration failed. Try again.';
            setMessage(errorMsg);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create a New Account
                </h2>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <FormInput 
                        label="Name" 
                        type="text" 
                        name="Name" 
                        value={Name} 
                        onChange={onChange} 
                        required 
                        placeholder="Full Name"
                    />
                    <FormInput 
                        label="Email Address" 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={onChange} 
                        required 
                        placeholder="user@college.edu"
                    />
                    <FormInput 
                        label="Role" 
                        type="text"
                        name="role" 
                        value={role} 
                        onChange={onChange} 
                        required 
                        option="admin,student,faculty"
                        placeholder="e.g., admin, student, faculty"
                    />
                    <FormInput 
                        label="ID Number" 
                        type="text" 
                        name="Id" 
                        value={Id} 
                        onChange={onChange} 
                        placeholder="e.g., S102345"
                    />

                    <FormInput 
                        label="Password" 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={onChange} 
                        required 
                        minLength="6"
                        placeholder="Minimum 6 characters"
                    />
                    <FormInput 
                        label="Confirm Password" 
                        type="password" 
                        name="confirmPassword" 
                        value={confirmPassword} 
                        onChange={onChange} 
                        required 
                        minLength="6"
                        placeholder="Repeat password"
                    />
                    
                    <button 
                        type="submit" 
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
                    >
                        Register
                    </button>
                </form>
                {message && <p className={`text-center text-sm mt-4 ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
                <p className="text-center text-sm text-gray-600">
                    Already Registered? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Please login to the application.</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;