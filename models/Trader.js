const mongoose = require('mongoose');

const traderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  traderLevel: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['online', 'offline'],
    default: 'offline'
  },
  imageUrl: {
    type: String,
    required: false
  },
  bio: {
    type: String,
    required: true
  },
   portfolio: {
    type: [String],
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Trader', traderSchema);
