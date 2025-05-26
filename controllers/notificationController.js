const admin = require('../services/firebase');
const User = require('../models/User');

exports.sendNotificationToAllUsers = async (req, res) => {
  try {
    const users = await User.find({ deviceToken: { $ne: null } });
    const tokens = users.map(user => user.deviceToken).filter(Boolean);

    if (tokens.length === 0) {
      return res.status(200).json({ success: false, message: 'No device tokens found.' });
    }

    let successCount = 0;
    let failureCount = 0;

    for (const token of tokens) {
      try {
        await admin.messaging().send({
          notification: {
            title: 'Hello from Admin!',
            body: 'hi',
          },
          token,
        });
        successCount++;
      } catch (err) {
        console.error(`Failed to send to ${token}:`, err.message);
        failureCount++;
      }
    }

    res.status(200).json({
      success: true,
      message: 'Notifications sent (using fallback)',
      successCount,
      failureCount,
    });

  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).json({ success: false, message: 'Failed to send notifications', error: error.message });
  }
};
