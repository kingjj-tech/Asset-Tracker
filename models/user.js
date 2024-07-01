const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  user_id: { type: String, default: uuidv4, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  role: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
