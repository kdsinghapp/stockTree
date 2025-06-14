const express = require('express');
const router = express.Router();
const {
  getNotificationSettings,
  updateNotificationSettings,
} = require('../controllers/notificationsController');

router.get('/:userId', getNotificationSettings);
router.put('/:userId', updateNotificationSettings);

module.exports = router;
