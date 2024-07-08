const User = require('../models/user');

// Function to create a new user (only accessible by superusers)
const createUser = async (req, res) => {
  const { name, email, password, role, department } = req.body;

  if (!name || !email || !password || !role || !department) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    // Create a new user
    const newUser = new User({ name, email, password, role, department });
    await newUser.save();

    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send({ message: 'Error creating user', error });
  }
};

// Function to get all users (only accessible by superusers)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching users', error });
  }
};

module.exports = { createUser, getAllUsers };
