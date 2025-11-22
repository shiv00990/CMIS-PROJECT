const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        unique: true,
    },
    totalFee: {
        type: Number,
        required: true,},
    FeePaid: {
        type: Number,
        default: 0,
    },
    balanceDue: {
        type: Number,
        default: 0,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});

FeeSchema.pre('save', function (next) {
    this.balanceDue = this.totalFee - this.FeePaid;
    next();
});

module.exports = mongoose.model('Fee', FeeSchema);