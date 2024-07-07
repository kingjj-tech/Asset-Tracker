const cron = require('node-cron');
const mongoose = require('mongoose');
const User = require('./models/user'); // Adjust the path as needed
const Asset = require('./models/assets'); // Adjust the path as needed
const HistoricalData = require('./models/historicalData'); // Adjust the path as needed

// Connect to MongoDB (ensure this matches your existing connection setup)
mongoose.connect('mongodb://localhost:27017/asset_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB for cron jobs');

  // Run this job every day at midnight
  cron.schedule('0 0 * * *', async () => {
    try {
      const userCount = await User.countDocuments();
      const itemCount = await Asset.countDocuments();

      const historicalData = new HistoricalData({
        users: userCount,
        items: itemCount
      });

      await historicalData.save();
      console.log('Historical data saved successfully.');
    } catch (error) {
      console.error('Error saving historical data:', error);
    }
  });
});
