const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/verify-signup-otp', authController.verifySignupOTP);
router.post('/verify-otp', authController.verifyOTP);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/update-password', authController.updatePassword);
router.put('/update-profile/:id', authController.updateProfile);
router.get('/temp-hello', authController.tempHello);
// router.get('/users', authController.getAllUsers);



router.get('/public-endpoint', (req, res) => {
  res.json({ message: 'This is a public endpoint.' });
});

module.exports = router;
