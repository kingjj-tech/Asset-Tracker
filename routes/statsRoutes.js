const express = require('express');
const router = express.Router();

const User = require('../models/user'); // Ensure this path is correct
const Activity = require('../models/activity'); // Ensure this path is correct

// Endpoint to get user and item counts
router.get('/counts', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const itemCount = await Asset.countDocuments();
    res.status(200).json({ userCount, itemCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch counts' });
  }
});

// Endpoint to get historical data
router.get('/historical-data', async (req, res) => {
  try {
    const historicalData = await HistoricalData.find();
    res.status(200).json(historicalData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
});


// Endpoint to get recent activities
router.get('/recent-activities', async (req, res) => {
    try {
      const activities = await Activity.find().sort({ date: -1 }).limit(10);
      res.status(200).json(activities.map(activity => activity.description));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch recent activities' });
    }
  });


router.get('/asset-overview', async (req, res) => {
    try {
      const totalAssets = await Asset.countDocuments();
      const assetsInUse = await Asset.countDocuments({ status: 'in-use' });
      const availableAssets = totalAssets - assetsInUse;
      res.status(200).json({ totalAssets, assetsInUse, availableAssets });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch asset overview' });
    }
  });

// Endpoint to get recent activities
router.get('/recent-activities', async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: -1 }).limit(10);
    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch recent activities' });
  }
});

module.exports = router;
