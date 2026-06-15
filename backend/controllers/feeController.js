const FeeDetail = require('../models/FeeDetail');
const User = require('../models/User');

const getStudentFees = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const feeRecord = await FeeDetail.findOne({ studentId }).populate('studentId', 'firstName lastName studentIdNumber email');

        if (!feeRecord) {
            return res.status(404).json({ msg: 'Fee record not found for this student.' });
        }

        // The virtual property 'balanceDue' is calculated automatically by the model
        res.json(feeRecord);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const createFeeRecord = async (req, res) => {
    const { studentId, academicYear, totalFee } = req.body;

    try {
        const student = await User.findById(studentId);
        if (!student || student.role !== 'student') {
            return res.status(404).json({ msg: 'Student not found or user is not a student.' });
        }

        let existingRecord = await FeeDetail.findOne({ studentId, academicYear });
        if (existingRecord) {
            return res.status(400).json({ msg: 'Fee record already exists for this student and academic year.' });
        }

        const newRecord = new FeeDetail({
            studentId,
            academicYear,
            totalFee,
            paidFee: 0
        });

        const feeDetail = await newRecord.save();
        res.status(201).json(feeDetail);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const recordPayment = async (req, res) => {
    const { studentId, academicYear, amount, method } = req.body;

    try {
        let feeRecord = await FeeDetail.findOne({ studentId, academicYear });

        if (!feeRecord) {
            return res.status(404).json({ msg: 'Fee record not found for payment.' });
        }

        // Update paid fee and payment history
        feeRecord.paidFee += amount;
        feeRecord.lastPaymentDate = Date.now();
        feeRecord.paymentHistory.push({ amount, method });
        
        await feeRecord.save();
        res.json(feeRecord);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getStudentFees,
    createFeeRecord,
    recordPayment
};