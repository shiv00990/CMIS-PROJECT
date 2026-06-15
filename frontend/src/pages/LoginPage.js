import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/useAuth';
import FormInput from '../components/FormInput';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const { email, password } = formData;

    

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

     const onSubmit = async e => {
        e.preventDefault();
        setMessage('');

        try {
            const res = await api.post('/auth/login', { email, password });
            const { token, role, id } = res.data;
            login(token, role, id); 

            // Redirect to the generic /dashboard, which handles role-specific navigation
            navigate('/dashboard'); 
            
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Login failed. Please check your credentials.';
            setMessage(errorMsg);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
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
                        label="Password" 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={onChange} 
                        required 
                        minLength="6"
                        placeholder="******"
                    />
                    
                    <button 
                        type="submit" 
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                    >
                        Login
                    </button>
                </form>
                {message && <p className={`text-center text-sm ${message.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
                <p className="text-center text-sm text-gray-600">
                    New User? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Create Account</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;