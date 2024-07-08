const express = require('express');
const router = express.Router();
const superUserController = require('../controllers/superUserController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// Only accessible by authenticated superusers
router.post('/create-user', auth, checkRole('superuser'), superUserController.createUser);
router.get('/users', auth, checkRole('superuser'), superUserController.getAllUsers);

module.exports = router;
