import React, { useState } from 'react';

import FormInput from '../components/FormInput';

const UserManagement = () => {
    const [searchId, setSearchId] = useState('');
    const [user, setUser] = useState(null);
    const [newRole, setNewRole] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const searchUser = async (e) => {
        e.preventDefault();
        setMessage('');
        setUser(null);
        setLoading(true);
        
        try {
            // 🚨 SIMULATION: The API endpoint GET /api/users/search/:id is missing in the backend.
            // In a real MERN app, this call would look like: 
            // const response = await api.get(`/users/search/${searchId}`);

            // --- SIMULATED RESPONSE for demonstration ---
            const mockRole = searchId.includes('admin') ? 'admin' : (searchId.includes('faculty') ? 'faculty' : 'student');
            
            const response = {
                data: {
                    _id: '65b93478a5e01f66d8e0e7a2',
                    email: searchId.includes('@') ? searchId : 'test.user@college.edu',
                    role: mockRole,
                    firstName: 'John',
                    lastName: 'Doe',
                }
            };

            setUser(response.data);
            setNewRole(response.data.role);
            setMessage(`Found user: ${response.data.firstName} ${response.data.lastName}`);

        } catch (err) {
            setMessage('Error finding user. Ensure the ID/Email is correct.');
        } finally {
            setLoading(false);
        }
    };

    const updateRole = async () => {
        if (!user || !newRole) return;
        setMessage('');
        
        try {
            // 🚨 ACTION REQUIRED: You MUST implement the backend route PUT /api/users/role/:id
            
            // SIMULATED success for demonstration
            await new Promise(resolve => setTimeout(resolve, 500)); 
            
            // Replace with real call: 
            // await api.put(`/users/role/${user._id}`, { role: newRole });
            
            setMessage(`Successfully updated role for ${user.email} to: ${newRole}!`);
            setUser(prev => ({ ...prev, role: newRole }));
            
        } catch (err) {
            // The backend MUST be updated to handle this route or this will always fail in production.
            setMessage('Error updating user role. Backend API (PUT /api/users/role) is missing or failed.');
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-red-700 mb-8 border-b pb-2">User & Role Management</h2>
            
            {/* Search Form */}
            <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border-t-4 border-red-500">
                <form onSubmit={searchUser} className="flex space-x-4">
                    <FormInput 
                        label="Search User by ID or Email"
                        type="text" 
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="Enter MongoDB ID or Email (e.g., test@user.com)"
                        required
                        className="flex-grow"
                    />
                    <button type="submit" className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
                        {loading ? 'Searching...' : 'Search User'}
                    </button>
                </form>
            </div>
            
            {/* User Details & Role Update */}
            {user && (
                <div className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-indigo-500">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">User Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-gray-700 mb-6">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                        <p><strong>MongoDB ID:</strong> <span className="font-mono text-sm bg-gray-100 p-1 rounded">{user._id}</span></p>
                        <p><strong>Current Role:</strong> <span className="capitalize font-bold text-indigo-600">{user.role}</span></p>
                    </div>

                    <div className="flex space-x-4 items-end border-t pt-4">
                        <div className="flex-grow">
                             <label className="block text-sm font-medium text-gray-700 mb-1">Update Role to:</label>
                            <select 
                                value={newRole} 
                                onChange={(e) => setNewRole(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200"
                            >
                                <option value="student">student</option>
                                <option value="faculty">faculty</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>
                        <button 
                            onClick={updateRole}
                            disabled={newRole === user.role}
                            className={`px-6 py-2 font-semibold rounded-lg transition ${newRole === user.role ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                        >
                            Update Role
                        </button>
                    </div>
                </div>
            )}
            
            {/* Message Area */}
            {message && <p className={`text-center mt-6 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</p>}
        </div>
    );
};

export default UserManagement;