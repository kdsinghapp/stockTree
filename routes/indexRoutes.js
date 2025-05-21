const express = require('express');
const router = express.Router();
const {
    getAllIndices,
    fetchAndSaveIndices
} = require('../controllers/indexController');

router.get('/fetch', fetchAndSaveIndices);
router.get('/', getAllIndices);

module.exports = router;
