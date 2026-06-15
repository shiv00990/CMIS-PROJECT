const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.put('/role/:id', [auth, checkRole('admin')], userController.updateUserRole);

router.get('/search/:id', [auth, checkRole('admin')], userController.searchUser);

module.exports = router;