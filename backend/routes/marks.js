const express = require('express');
const router = express.Router(); // <-- CRITICAL: Router object is defined here
const marksController = require('../controllers/marksController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');


router.get('/student/:studentId', auth, marksController.getMarksByStudent);

router.get('/course/:courseCode', [auth, checkRole('faculty')], marksController.getMarksByCourse);

router.post('/', [auth, checkRole('faculty')], marksController.addStudentMarks);

router.put('/:id', [auth, checkRole('faculty')], marksController.updateStudentMarks);

module.exports = router;