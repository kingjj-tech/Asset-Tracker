const express = require('express');
const Asset = require('../models/asset');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const router = express.Router();

// Route to register a new asset
router.post('/', auth, checkRole('client'), async (req, res) => {
  console.log('POST /assets called');
  try {
    const newAsset = new Asset(req.body);
    await newAsset.save();
    res.status(201).json(newAsset);
  } catch (error) {
    console.error('Error creating asset:', error);
    res.status(400).json({ error: 'Failed to create asset', details: error.message });
  }
});

// Route to get all assets
router.get('/', auth, checkRole('client'), async (req, res) => {
  console.log('GET /assets called');
  try {
    const assets = await Asset.find();
    res.status(200).json(assets);
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ error: 'Failed to fetch assets', details: error.message });
  }
});

// Route to update an asset
router.put('/:id', auth, checkRole('superuser'), async (req, res) => {
  console.log('PUT /assets/:id called');
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.json(asset);
  } catch (error) {
    console.error('Error updating asset:', error);
    res.status(400).json({ error: 'Failed to update asset', details: error.message });
  }
});

// Route to delete an asset
router.delete('/:id', auth, checkRole('superuser'), async (req, res) => {
  console.log('DELETE /assets/:id called');
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.json(asset);
  } catch (error) {
    console.error('Error deleting asset:', error);
    res.status(500).json({ error: 'Failed to delete asset', details: error.message });
  }
});

module.exports = router;
