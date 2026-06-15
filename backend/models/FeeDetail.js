const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FeeDetailSchema = new Schema({
    // The student this fee record belongs to. It creates a link to the User model.
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assumes your user model is named 'User'
        required: [true, 'Student ID is required'],
        unique: true // A student should have only one FeeDetail record (or one per academic year, as per the unique index below)
    },
    // The academic year this fee record pertains to (e.g., "2024-2025")
    academicYear: {
        type: String,
        required: [true, 'Academic year is required'],
        trim: true
    },
    // The official total fee amount for the academic period
    totalFee: {
        type: Number,
        required: [true, 'Total fee amount is required'],
        min: [0, 'Total fee cannot be negative']
    },
    // The cumulative amount the student has paid so far
    paidFee: {
        type: Number,
        required: [true, 'Paid fee amount is required'],
        default: 0,
        min: [0, 'Paid fee cannot be negative']
    },
    // Date of the last payment made (optional)
    lastPaymentDate: {
        type: Date,
        default: null
    },
    // Optional: An array to log every individual payment made
    paymentHistory: [
        {
            amount: { type: Number, required: true },
            date: { type: Date, default: Date.now },
            method: { type: String, trim: true } // e.g., 'Online', 'Cash', 'Cheque'
        }
    ]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

FeeDetailSchema.index({ studentId: 1, academicYear: 1 }, { unique: true });
FeeDetailSchema.virtual('balanceDue').get(function() {
    const balance = this.totalFee - this.paidFee;
    return balance > 0 ? balance : 0;
});

const FeeDetail = mongoose.model('FeeDetail', FeeDetailSchema);

module.exports = FeeDetail;