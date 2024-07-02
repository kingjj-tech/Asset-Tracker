const aclInstance = require('./aclSetup'); // Correct relative path

// Middleware to check roles
const checkRole = (role) => {
  return (req, res, next) => {
    aclInstance.isAllowed(req.user.id, req.originalUrl, req.method.toLowerCase(), (err, allowed) => {
      if (err) {
        return res.status(500).send('Unexpected authorization error');
      }
      if (allowed) {
        return next();
      } else {
        return res.status(403).send('Insufficient permissions');
      }
    });
  };
};

module.exports = checkRole;
