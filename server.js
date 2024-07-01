const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Asset = require('./models/asset');
const AssetHistory = require('./models/assetHistory');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/asset_management');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

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

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
