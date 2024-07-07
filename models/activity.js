const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
