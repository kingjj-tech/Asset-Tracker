const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Asset = require('./models/asset');
const AssetHistory = require('./models/assetHistory');
const auth = require('./middleware/auth');
const checkRole = require('./middleware/checkRole');
const acl = require('./aclSetup');
const authRoutes = require('./routes/authRoutes'); // Add this line
const userRoutes = require('./routes/userRoutes'); // Add this line
const assetRoutes = require('./routes/assetRoutes'); // Add this line
const assetHistoryRoutes = require('./routes/assetHistoryRoutes'); // Add this line

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/asset_management');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  // Initialize ACL setup here
  const aclInstance = require('./aclSetup');

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Asset Tracking and Management API');
  });

  // Use the routes
  app.use('/auth', authRoutes); // Add this line
  app.use('/users', userRoutes); // Add this line
  app.use('/assets', assetRoutes); // Add this line
  app.use('/assetHistory', assetHistoryRoutes); // Add this line

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
