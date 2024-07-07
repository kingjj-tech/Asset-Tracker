const mongoose = require('mongoose');

const historicalDataSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  users: { type: Number, required: true },
  items: { type: Number, required: true }
});

module.exports = mongoose.models.HistoricalData || mongoose.model('HistoricalData', historicalDataSchema);
