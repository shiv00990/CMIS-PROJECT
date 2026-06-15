const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentMarksSchema = new Schema({
    Id: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true,
        trim: true
    },
    courseCode: {
        type: String,
        required: true,
        trim: true
    },
    semester: {
        type: Number,
        required: true,
        min: 1
    },
    marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    grade: {
        type: String,
        trim: true
    },
    academicYear: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

StudentMarksSchema.index({ Id: 1, courseCode: 1, semester: 1 }, { unique: true });

const StudentMarks = mongoose.model('StudentMarks', StudentMarksSchema);

module.exports = StudentMarks;