import React, { useState } from 'react';
import api from '../api/api';
import FormInput from '../components/FormInput';

const FeeManagement = () => {
    const [recordForm, setRecordForm] = useState({ studentId: '', academicYear: '2024-2025', totalFee: '' });
    const [paymentForm, setPaymentForm] = useState({ studentId: '', academicYear: '2024-2025', amount: '', method: 'Cash' });
    const [message, setMessage] = useState('');

    const handleRecordChange = e => setRecordForm({ ...recordForm, [e.target.name]: e.target.value });
    const handlePaymentChange = e => setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });

    const createFeeRecord = async e => {
        e.preventDefault();
        setMessage('');
        try {
            await api.post('/fees', recordForm);
            setMessage(`Initial fee record created for student ${recordForm.studentId}. Total fee: $${recordForm.totalFee}`);
            setRecordForm({ studentId: '', academicYear: recordForm.academicYear, totalFee: '' });
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Error creating fee record.';
            setMessage(`Error: ${errorMsg}`);
        }
    };

    const recordPayment = async e => {
        e.preventDefault();
        setMessage('');
        try {
            await api.post('/fees/payment', paymentForm);
            setMessage(`Payment of $${paymentForm.amount} recorded for student ${paymentForm.studentId}.`);
            setPaymentForm({ studentId: '', academicYear: paymentForm.academicYear, amount: '', method: 'Cash' });
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Error recording payment.';
            setMessage(`Error: ${errorMsg}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-yellow-700 mb-8 border-b pb-2">Fee Management & Processing</h2>
            
            {/* Messages */}
            {message && <p className={`mb-6 p-3 rounded text-center ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1. Create Initial Fee Record */}
                <div className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-yellow-500">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">1. Set Annual Fee Record</h3>
                    <form onSubmit={createFeeRecord} className="space-y-4">
                        <FormInput label="Student MongoDB ID" name="studentId" value={recordForm.studentId} onChange={handleRecordChange} required type="text" placeholder="MongoDB ID" />
                        <FormInput label="Academic Year" name="academicYear" value={recordForm.academicYear} onChange={handleRecordChange} required type="text" />
                        <FormInput label="Total Fee ($)" name="totalFee" value={recordForm.totalFee} onChange={handleRecordChange} required type="number" min="0" />
                        <button 
                            type="submit" 
                            className="w-full py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition"
                        >
                            Create Fee Record
                        </button>
                    </form>
                </div>

                {/* 2. Record Payment */}
                <div className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-green-500">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">2. Record New Payment</h3>
                    <form onSubmit={recordPayment} className="space-y-4">
                        <FormInput label="Student MongoDB ID" name="studentId" value={paymentForm.studentId} onChange={handlePaymentChange} required type="text" placeholder="MongoDB ID" />
                        <FormInput label="Academic Year" name="academicYear" value={paymentForm.academicYear} onChange={handlePaymentChange} required type="text" />
                        <FormInput label="Payment Amount ($)" name="amount" value={paymentForm.amount} onChange={handlePaymentChange} required type="number" min="1" />
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                            <select name="method" value={paymentForm.method} onChange={handlePaymentChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200">
                                <option value="Cash">Cash</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="Card">Card</option>
                            </select>
                        </div>
                        <button 
                            type="submit" 
                            className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                        >
                            Process Payment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeeManagement;