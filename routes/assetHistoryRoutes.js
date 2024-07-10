const express = require('express');
const AssetHistory = require('../models/assetHistory');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware

// Apply authMiddleware to all asset history routes
router.use(authMiddleware);

// Route to register a new asset history record
router.post('/', async (req, res) => {
  try {
    const newAssetHistory = new AssetHistory(req.body);
    await newAssetHistory.save();
    res.status(201).send(newAssetHistory);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get all asset history records
router.get('/', async (req, res) => {
  try {
    const assetHistories = await AssetHistory.find();
    res.status(200).send(assetHistories);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
