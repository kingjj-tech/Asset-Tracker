// routes/userRoutes.js
const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const router = express.Router();

// Route to register a new user
router.post('/', auth, checkRole('superuser'), async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route to get all users
router.get('/', auth, checkRole('superuser'), async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
