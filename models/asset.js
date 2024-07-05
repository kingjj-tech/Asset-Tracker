const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  type: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  purchase_date: { type: Date, required: true },
  warranty_end_date: { type: Date, required: true },
  status: { type: String, required: true },
  location: { type: String } // Made optional by removing `required: true`
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
