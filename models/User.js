const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  nickname: { type: String },
  dateOfBirth: { type: Date },
  phone: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  profileImage: { type: String , default: '' }, // base64 or URL
  membershipTier: { type: String, enum: ['basic', 'premium', 'vip'], required: true },
  otp: { type: String },
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
