const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin','office_staff'],
        default: 'student',
    },
});

module.exports = mongoose.model('User', UserSchema);