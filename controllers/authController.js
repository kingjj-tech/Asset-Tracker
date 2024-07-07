const User = require('../models/user');

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

    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send({ message: 'Error creating user', error });
  }
};

// Function to login a user
const login = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Simplified response without password check or token generation
    res.send({ user });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { register, login };
