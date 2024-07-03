const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const assetRoutes = require('./routes/assetRoutes');
const assetHistoryRoutes = require('./routes/assetHistoryRoutes');
const auth = require('./middleware/auth');
const checkRole = require('./middleware/checkRole');
const aclInstance = require('./aclSetup');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/asset_management', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  app.use(express.json());

  app.use('/auth', authRoutes); // Register auth routes here
  app.use('/users', userRoutes);
  app.use('/assets', assetRoutes);
  app.use('/assetHistory', assetHistoryRoutes);

  app.get('/', (req, res) => {
    res.send('Asset Tracking and Management API');
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
