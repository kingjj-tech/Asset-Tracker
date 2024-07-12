const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  action: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: String }
});

module.exports = mongoose.model('History', historySchema);
