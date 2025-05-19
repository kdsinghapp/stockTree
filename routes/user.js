const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const upload = require('../middleware/upload');
const {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
} = require('../controllers/userController');


router.get('/profile', verifyToken, getUserProfile);

router.post(
  '/updateprofile',
  verifyToken,
  upload.single('profileImage'), 
  updateUserProfile
);
router.post('/profile/image', verifyToken, uploadProfileImage);

module.exports = router;
