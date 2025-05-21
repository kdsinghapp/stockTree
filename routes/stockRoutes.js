const express = require('express');
const router = express.Router();
const {
    fetchAndSaveStocks,
    getAllStocks
} = require('../controllers/stockController');

router.get('/fetch', fetchAndSaveStocks);
router.get('/', getAllStocks);

module.exports = router;
