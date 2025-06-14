const mongoose = require('mongoose');

const notificationSettingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
  generalNotification: { type: Boolean, default: true },
  sound: { type: Boolean, default: true },
  vibrate: { type: Boolean, default: true },
  appUpdates: { type: Boolean, default: true },
  newTipsAvailable: { type: Boolean, default: true },
  aiVoice: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NotificationSetting', notificationSettingSchema);