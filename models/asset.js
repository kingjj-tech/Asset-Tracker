const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const assetSchema = new mongoose.Schema({
  asset_id: { type: String, default: uuidv4, unique: true },
  type: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  purchase_date: { type: Date, required: true },
  warranty_end_date: { type: Date, required: true },
  status: { type: String, enum: ['in use', 'in storage', 'disposed'], required: true },
  location: { type: String, required: true },
  assigned_to: { type: String, ref: 'User', default: null }
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
