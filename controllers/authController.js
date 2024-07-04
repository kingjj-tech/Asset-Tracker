const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, department, role, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const newUser = new User({ name, email, department, role, password });

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, 'password123', { expiresIn: '1h' });
    newUser.tokens = newUser.tokens.concat({ token });
    await newUser.save();

    res.status(201).send({ user: newUser, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'password123', { expiresIn: '1h' });
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { register, login };
