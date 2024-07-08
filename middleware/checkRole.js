const User = require('../models/user');

const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      if (user.role !== role) {
        return res.status(403).send({ error: 'Access denied' });
      }
      next();
    } catch (error) {
      res.status(500).send({ error: 'Internal server error' });
    }
  };
};

module.exports = checkRole;
