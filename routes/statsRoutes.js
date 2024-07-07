// routes/statsRoute.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Asset = require('../models/asset');
const HistoricalData = require('../models/historicalData');
const Activity = require('../models/activity');

// Route to get user and item counts
router.get('/counts', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const itemCount = await Asset.countDocuments();
        res.json({ userCount, itemCount });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get historical data
router.get('/historical-data', async (req, res) => {
    try {
        const historicalData = await HistoricalData.find().sort({ date: 1 });
        res.json(historicalData);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get recent activities
router.get('/recent-activities', async (req, res) => {
    try {
        const recentActivities = await Activity.find().sort({ date: -1 }).limit(10);
        res.json(recentActivities);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
