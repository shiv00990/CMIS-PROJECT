const Course = require('../models/Course');

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ courseCode: 1 });

        if (!courses) {
            return res.status(404).json({ msg: 'No courses found' });
        }

        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        res.json(course);
    } catch (err) {
        console.error(err.message);
        // Check if the error is due to an invalid ObjectId format
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Course not found' });
        }
        res.status(500).send('Server error');
    }
};

const addCourse = async (req, res) => {
    const { courseName, courseCode, description, credits, department } = req.body;

    try {
        let course = await Course.findOne({ courseCode });

        if (course) {
            return res.status(400).json({ msg: 'Course with this code already exists' });
        }

        const newCourse = new Course({
            courseName,
            courseCode,
            description,
            credits,
            department
        });

        course = await newCourse.save();

        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    addCourse
};