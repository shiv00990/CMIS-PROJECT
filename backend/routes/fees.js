const express = require('express');
const router = express.Router();
const feeController = require('../controllers/feeController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');


router.get('/student/:studentId', auth, feeController.getStudentFees);

router.post('/payment', [auth, checkRole('admin')], feeController.recordPayment);

router.post('/', [auth, checkRole('admin')], feeController.createFeeRecord);

module.exports = router;