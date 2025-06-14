const NotificationSetting = require('../models/NotificationSetting');

exports.getNotificationSettings = async (req, res) => {
  const userId = req.params.userId; // or from auth middleware

  try {
    const settings = await NotificationSetting.findOne({ userId });

    if (!settings) {
      return res.status(404).json({ success: false, message: 'Notification settings not found' });
    }

    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

exports.updateNotificationSettings = async (req, res) => {
  const userId = req.params.userId;
  const updates = req.body;

  try {
    const settings = await NotificationSetting.findOneAndUpdate(
      { userId },
      { ...updates, updatedAt: Date.now() },
      { new: true, upsert: true } // create if not exists
    );

    res.json({ success: true, message: 'Settings updated', data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};
