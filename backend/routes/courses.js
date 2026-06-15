const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const auth = require('../middleware/auth'); // Middleware for token verification
const checkRole = require('../middleware/checkRole'); // Middleware for role checking

router.get('/', courseController.getAllCourses);

router.post('/', [auth, checkRole('admin')], courseController.addCourse);

router.get('/:id', courseController.getCourseById);

module.exports = router;