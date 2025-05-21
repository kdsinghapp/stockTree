const express = require('express');
const upload = require('../middleware/upload');
const bannerController = require('../controllers/bannerController');
const router = express.Router();

// Create banner (with image upload)
router.post('/', upload.single('image'), bannerController.createBanner);

// Get all active banners
router.get('/', bannerController.getBanners);

module.exports = router;
