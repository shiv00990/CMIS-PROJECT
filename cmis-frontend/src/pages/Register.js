import React, {userState} from 'react';
import {Link} from 'react-router-dom';

const Register = () => {
    const[formData, setFormData] = userState({
        emailAddress: '',
        password: '',
        confirmPassword: ''
    });
    const {emailAddress, password, confirmPassword} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Passwords do not match');
            return;
        }
        try {
            const res = await fetch('/api/v1/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({emailAddress, password})
            });

            const data = await res.json();

            if(res.status === 400 && data.message==='User already exists'){
                alert(data.message);
            }
            else if(res.ok){
                console.log('Registration successful, Token:', data.token);
                alert('Registration successful! You can now log in.');
            } else {
                alert(data.message ||'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Error during registration:', err);
            alert('An error occurred. Please try again later.');
        }
    };
    return (
        <div className="register-container">
            <h1>User Registration</h1>
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
                        required minLength="6"
                        />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChange}
                        required minLength="6"
                        />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
}
export default Register;
