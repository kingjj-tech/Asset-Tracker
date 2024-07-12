const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  type: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  warrantyEndDate: { type: Date, required: true },
  status: { type: String, required: true },
  location: { type: String, required: true },
  assigned_to: { type: String, default: null }, // If applicable
  asset_id: { type: String, required: true },
  assigned_date: { type: Date, default: Date.now } // Add this line
});

module.exports = mongoose.models.Asset || mongoose.model('Asset', assetSchema);
