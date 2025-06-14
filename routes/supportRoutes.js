// routes/supportRoutes.js
const express = require('express');
const router = express.Router();
const { createSupportRequest } = require('../controllers/supportController');

router.post('/contact', createSupportRequest);

module.exports = router;
