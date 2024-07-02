const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Asset = require('./models/asset');
const AssetHistory = require('./models/assetHistory');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/asset_management');

// Event listener for successful MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Event listener for MongoDB connection error
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Root route for basic API information
app.get('/', (req, res) => {
  res.send('Asset Tracking and Management API');
});

// Route to register a new user
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/assets', async (req, res) => {
  try {
    const { type, make, model, purchase_date, warranty_end_date, status, location, assigned_to } = req.body;
    const newAsset = new Asset({
      type,
      make,
      model,
      purchase_date,
      warranty_end_date,
      status,
      location,
      assigned_to
    });
    await newAsset.save();
    res.status(201).send(newAsset);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});