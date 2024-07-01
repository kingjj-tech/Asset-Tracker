const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Asset = require('./models/asset');
const AssetHistory = require('./models/assetHistory');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/asset_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
