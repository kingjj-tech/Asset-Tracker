const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Asset = require('./models/asset');
const AssetHistory = require('./models/assetHistory');
const auth = require('./middleware/auth');
const checkRole = require('./middleware/checkRole');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/asset_management', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  
  // Initialize ACL setup here
  const aclInstance = require('./aclSetup');

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Asset Tracking and Management API');
  });

  app.post('/users', async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).send(newUser);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get('/users', auth, checkRole('superuser'), async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post('/assets', auth, checkRole('client'), async (req, res) => {
    try {
      const { type, make, model, purchase_date, warranty_end_date, status, location, assigned_to } = req.body;
      const newAsset = new Asset({ type, make, model, purchase_date, warranty_end_date, status, location, assigned_to });
      await newAsset.save();
      res.status(201).send(newAsset);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
