import React, { useState } from 'react';
import {link, useNavigate} from 'react-router-dom';

const Login = () => {
    const[formData, setFormData] = useState({
        emailAddress: '',
        password: ''
    });
    const {emailAddress, password} = formData;
    const navigate = useNavigate();

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                const data = await res.json();
                console.log('Login successful, Token:', data.token);
            }else {
                const error= await res.json();
                alert(error.message || 'Login failed. Check your credentials and try again.');
            }
        } catch (err) {
            console.error('Error during login:', err);
            alert('An error occurred. Please try again later.');
        }
    };
    return (
        <div className="login-container">
            <h1>User Login</h1>
            <form onSubmit={onSubmit} className="form">
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="emailAddress"
                        value={emailAddress}
                        onChange={onChange}
                        required
                        />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                        minLength="6"
                        />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>    

            </form>
            <p className="my-1">
                Don't have an account? <link to="/register">Sign Up</link>
            </p>
        </div>
    );
};
export default Login;
