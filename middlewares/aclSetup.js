const acl = require('acl');
const mongoose = require('mongoose');

// Use the MongoDB backend for ACL
const mongoBackend = new acl.mongodbBackend(mongoose.connection.db, 'acl_');
const aclInstance = new acl(mongoBackend);

// Define roles and permissions
aclInstance.allow([
  {
    roles: 'superuser',
    allows: [
      { resources: '/assets', permissions: '*' },
      { resources: '/users', permissions: '*' },
      { resources: '/assetHistory', permissions: '*' }
    ]
  },
  {
    roles: 'client',
    allows: [
      { resources: '/assets', permissions: ['get', 'post'] },
      { resources: '/users', permissions: ['get'] }
    ]
  }
]);

module.exports = aclInstance;
