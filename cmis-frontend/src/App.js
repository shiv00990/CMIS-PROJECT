import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseDetails from './pages/CourseDetails';


const App = () => {
    return (
          <Router> 
            <div className="container">
                <Routes>
                    <Route path="/" element={<Navigate replace to="/login" />} /> 
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/register" element={<Register />} />
                    <Route path="/courses" element={<CourseDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;