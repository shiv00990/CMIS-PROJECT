const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
   courseName: {
        type: String,
        required: [true, 'Course name is required'],
        trim: true,
        unique: true // Ensures no two courses have the exact same name
    },
    courseCode: {
        type: String,
        required: [true, 'Course code is required'],
        trim: true,
        unique: true
    },
   description: {
        type: String,
        required: false, // Optional, but recommended
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    credits: {
        type: Number,
        required: [true, 'Credits are required'],
        min: [1, 'Credits must be at least 1']
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        trim: true
    }
}, {
    timestamps: true
});


const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;