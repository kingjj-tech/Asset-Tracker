const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Asset = require('../models/Asset');
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware

// Apply authMiddleware to all asset routes
router.use(authMiddleware);

// Create a new asset
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

// Update an asset
router.put('/:id', async (req, res) => {
  const { id } = req.params; // Extract the asset ID from the request parameters
  const updateData = req.body; // Data to update the asset with

  // Optional: Add validation for updateData here
  // For example, check if updateData is empty
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: 'Update data is empty' });
  }

  try {
    const updatedAsset = await Asset.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }); // Update the asset
    if (!updatedAsset) {
      return res.status(404).json({ error: 'Asset not found' }); // Asset not found
    }
    res.status(200).json(updatedAsset); // Send the updated asset with a 200 status code
  } catch (error) {
    console.error(error); // Log any errors
    // Handle validation errors or other errors separately
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Validation error', details: error.message });
    } else {
      res.status(500).json({ error: 'Failed to update asset' }); // Return a 500 status code with an error message
    }
  }
});

// Delete an asset
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Extract the asset ID from the request parameters

  try {
    const deletedAsset = await Asset.findByIdAndDelete(id); // Attempt to delete the asset
    if (!deletedAsset) {
      return res.status(404).json({ error: 'Asset not found' }); // Asset not found
    }
    res.status(200).json({ message: 'Asset deleted successfully', deletedAsset }); // Send success response
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ error: 'Failed to delete asset' }); // Return a 500 status code with an error message
  }
});

// Get all assets
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.find();
    res.status(200).json(assets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
});

module.exports = router;
