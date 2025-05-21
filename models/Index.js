const mongoose = require('mongoose');

const indexSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  country: String,
  currency: String,
  exchange: String,
  type: String,
});

module.exports = mongoose.model('Index', indexSchema);
