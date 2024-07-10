const express = require('express');
const User = require('../models/user');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware

// Apply authMiddleware to all user routes
router.use(authMiddleware);

// Route to register a new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to remove a user by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Extract the user ID from the request parameters

  try {
    const deletedUser = await User.findByIdAndDelete(id); // Attempt to delete the user
    if (!deletedUser) {
      return res.status(404).send({ error: 'User not found' }); // User not found
    }
    res.status(200).send({ message: 'User deleted successfully', deletedUser }); // Send success response
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).send(error); // Return a 500 status code with an error message
  }
});

module.exports = router;
