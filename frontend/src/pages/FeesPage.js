import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import { useAuth } from '../context/useAuth';

const FeesPage = () => {
    const { userRole } = useAuth();
    const [studentIdToSearch, setStudentIdToSearch] = useState('STUDENT_ID_FROM_AUTH_CONTEXT'); 
    const [feeDetails, setFeeDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('Ready to fetch fee details.');

    // Function to fetch the fee data
    const fetchFeeDetails = useCallback(async (id) => {
        setLoading(true);
        setFeeDetails(null);
        setMessage('');

        if (!id || id === 'STUDENT_ID_FROM_AUTH_CONTEXT') {
            setMessage('Student ID not available or required for search.');
            setLoading(false);
            return;
        }

        try {
            // Note: Replace with the actual student ID from auth context for student users.
            const response = await api.get(`/fees/student/${id}`);
            setFeeDetails(response.data);
            setMessage('Fee details retrieved successfully.');
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Fee record not found for this student or error fetching data.';
            setMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    }, []);

    // Effect for student users: fetch data automatically on load
    useEffect(() => {
        if (userRole === 'student' && studentIdToSearch !== 'STUDENT_ID_FROM_AUTH_CONTEXT') {
             fetchFeeDetails(studentIdToSearch);
        }
    }, [userRole, studentIdToSearch, fetchFeeDetails]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchFeeDetails(studentIdToSearch);
    };

    return (
        <div className="fees-page">
            <h2>💰 Fees Details and Payment Status</h2>
            
            {(userRole === 'admin' || userRole === 'faculty') && (
                <form onSubmit={handleSearch} className="search-form">
                    <input 
                        type="text" 
                        placeholder="Search by Student ID" 
                        value={studentIdToSearch}
                        onChange={(e) => setStudentIdToSearch(e.target.value)}
                        required
                    />
                    <button type="submit">Search Fees</button>
                </form>
            )}

            {loading && <div className="loading">Fetching fee data...</div>}
            
            {!loading && message && <p className="info-message">{message}</p>}

            {feeDetails && (
                <div className="fee-summary">
                    <h3>Fee Summary for Academic Year: {feeDetails.academicYear}</h3>
                    <div className="fee-card total-fee">
                        <h4>Total Fee Payable:</h4>
                        <p>{feeDetails.totalFee.toFixed(2)}</p>
                    </div>
                    
                    <div className="fee-card paid-fee">
                        <h4>Amount Paid:</h4>
                        <p>{feeDetails.paidFee.toFixed(2)}</p>
                    </div>
                    
                    {/* The crucial balance due value calculated by the Mongoose Virtual */}
                    <div className={`fee-card balance-due ${feeDetails.balanceDue > 0 ? 'due' : 'paid-off'}`}>
                        <h4>Balance Due:</h4>
                        <p>{feeDetails.balanceDue.toFixed(2)}</p>
                    </div>

                    {feeDetails.balanceDue <= 0 && (
                         <p className="success-message">🎉 Congratulations! All fees are paid for this period.</p>
                    )}

                    <h4>Payment History</h4>
                    {feeDetails.paymentHistory.length > 0 ? (
                        <ul>
                            {feeDetails.paymentHistory.map((payment, index) => (
                                <li key={index}>
                                    Paid ${payment.amount.toFixed(2)} on {new Date(payment.date).toLocaleDateString()} via {payment.method}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No payment history recorded yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default FeesPage;