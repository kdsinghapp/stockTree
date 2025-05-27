const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  durationType: {
    type: String,
    required: true,
    enum: ['days', 'weeks', 'months', 'years'],
    default: 'months'
  },
  planType: {
    type: String,
    required: true,
    enum: ['Cash', 'Future + Option', 'Premium', 'Basic'],
    default: 'Cash'
  },
  features: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    trim: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  maxUsers: {
    type: Number,
    default: null // null means unlimited
  },
  currentUsers: {
    type: Number,
    default: 0
  },
  discount: {
    percentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    validUntil: {
      type: Date,
      default: null
    }
  }
}, {
  timestamps: true
});

// Virtual for formatted price
planSchema.virtual('formattedPrice').get(function() {
  return `₹${this.price}`;
});

// Virtual for duration display
planSchema.virtual('durationDisplay').get(function() {
  return `${this.duration} ${this.durationType}`;
});

// Method to check if plan has active discount
planSchema.methods.hasActiveDiscount = function() {
  if (!this.discount.validUntil) return false;
  return new Date() <= this.discount.validUntil && this.discount.percentage > 0;
};

// Method to get discounted price
planSchema.methods.getDiscountedPrice = function() {
  if (!this.hasActiveDiscount()) return this.price;
  return this.price - (this.price * this.discount.percentage / 100);
};

module.exports = mongoose.model('Plan', planSchema);