const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const assetHistorySchema = new mongoose.Schema({
  history_id: { type: String, default: uuidv4, unique: true },
  asset_id: { type: String, ref: 'Asset', required: true },
  user_id: { type: String, ref: 'User', required: true },
  assigned_date: { type: Date, required: true },
  returned_date: { type: Date, default: null },
  status: { type: String, enum: ['assigned', 'returned', 'disposed'], required: true }
});

const AssetHistory = mongoose.model('AssetHistory', assetHistorySchema);

module.exports = AssetHistory;
