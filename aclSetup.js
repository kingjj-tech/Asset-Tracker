const acl = require('acl');
const mongoose = require('mongoose');

// Initialize the MongoDB connection
mongoose.connect('mongodb:/localhost:27017/asset_management', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  
  const mongoBackend = new acl.mongodbBackend(mongoose.connection.db, 'acl_');
  const aclInstance = new acl(mongoBackend);

  // Define roles and permissions
  aclInstance.allow([
    {
      roles: 'superuser',
      allows: [
        { resources: '/assets', permissions: ['get', 'post', 'put', 'delete'] },
        { resources: '/users', permissions: ['get', 'post', 'put', 'delete'] },
        { resources: '/assetHistory', permissions: ['get', 'post', 'put', 'delete'] }
      ]
    },
    {
      roles: 'client',
      allows: [
        { resources: '/assets', permissions: ['get', 'post'] },
        { resources: '/users', permissions: ['get'] },
        { resources: '/assetHistory', permissions: [] }
      ]
    }
  ]);

  module.exports = aclInstance;
});

module.exports = acl;
