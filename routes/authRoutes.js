const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/verify-signup-otp', authController.verifySignupOTP);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-otp', authController.verifyOTP);
router.post('/update-password', authController.updatePassword);
router.get('/temp-hello', authController.tempHello);

router.get('/public-endpoint', (req, res) => {
  res.json({ message: 'This is a public endpoint.' });
});

module.exports = router;
