const User = require('../models/user');

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

module.exports = { login };
