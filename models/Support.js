const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Support', supportSchema);