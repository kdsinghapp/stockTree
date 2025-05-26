const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/send-notification', notificationController.sendNotificationToAllUsers);

module.exports = router;
