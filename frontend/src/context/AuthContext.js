import React, { createContext, useState, useEffect, useContext } from 'react';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const id = localStorage.getItem('userId');
        
        if (token && role && id) {
            setIsAuthenticated(true);
            setUserRole(role);
            setUserId(id);
        }
        setLoading(false);
    }, []);

    const login = (token, role, id) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('userId', id);
        setIsAuthenticated(true);
        setUserRole(role);
        setUserId(id);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        setIsAuthenticated(false);
        setUserRole(null);
        setUserId(null);
    };

    const value = {
        isAuthenticated,
        userRole,
        userId,
        login,
        logout,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
// In AuthContext.js
export default AuthContext;