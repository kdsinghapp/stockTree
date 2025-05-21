const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  currency: String,
  exchange: String,
  country: String,
  type: String
}, { timestamps: true });

module.exports = mongoose.model('Stock', stockSchema);
