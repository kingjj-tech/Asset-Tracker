const aclInstance = require('../aclSetup');

const checkRole = (role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    aclInstance.isAllowed(userRole, req.originalUrl, req.method.toLowerCase(), (err, allowed) => {
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
