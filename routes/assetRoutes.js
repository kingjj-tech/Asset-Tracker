const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Asset = require('../models/Asset');

router.post('/', async (req, res) => {
  const { type, make, model, purchaseDate, warrantyEndDate, status, location } = req.body;

  if (!type || !make || !model || !purchaseDate || !warrantyEndDate || !status || !location) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const asset = new Asset({
      type,
      make,
      model,
      purchaseDate,
      warrantyEndDate,
      status,
      location,
      asset_id: new mongoose.Types.ObjectId().toString()
    });

    await asset.save();
    res.status(201).json({ message: 'Asset created successfully', asset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create asset' });
  }
});

module.exports = router;
