const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const aclSchema = new mongoose.Schema({
  role_id: { type: String, default: uuidv4, unique: true },
  role_name: { type: String, required: true, unique: true },
  resources: [
    {
      resource: { type: String, required: true },
      permissions: { type: [String], required: true }
    }
  ]
});                                                                                                     

const ACL = mongoose.model('ACL', aclSchema);

module.exports = ACL;
