const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Asset = require('./models/asset');
const AssetHistory = require('./models/assetHistory');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/asset_management', { useNewUrlParser: true, useUnifiedTopology: true });

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

// Route to register a new asset
app.post('/assets', async (req, res) => {
  try {
    // Extract asset data from the request body
    const { type, make, model, purchase_date, warranty_end_date, status, location, assigned_to } = req.body;

    // Create a new asset instance using the extracted data
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

    // Save the new asset to the database
    await newAsset.save();

    // Send a 201 response with the newly created asset
    res.status(201).send(newAsset);
  } catch (error) {
    // Handle any errors that occur during asset creation
    res.status(400).send(error);
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
