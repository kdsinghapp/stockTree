const express = require('express');
const router = express.Router();
const traderController = require('../controllers/traderController');

router.post('/', traderController.createTrader);
router.get('/', traderController.getAllTraders);
router.get('/:id', traderController.getTraderById);
router.put('/:id', traderController.updateTrader);
router.delete('/:id', traderController.deleteTrader);

module.exports = router;