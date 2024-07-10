const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config(); // Load environment variables

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Function to register a new user
const register = async (req, res) => {
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

    // Generate a token
    const token = await newUser.generateAuthToken();

    res.status(201).send({ newUser, token });
  } catch (error) {
    res.status(400).send({ message: 'Error creating user', error });
  }
};

// Function to login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    // Generate a token
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { register, login };
