const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({ 
    studentID: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true},
    lastName: {
        type: String,
        required: true
    },
    dateOfAdmission: {
        type: Date,
        default: Date.now
    },
    
    departmentName: {
        type: String,
        required: true,},
});
module.exports = mongoose.model('Student', StudentSchema);