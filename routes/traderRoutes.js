const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const traderController = require('../controllers/traderController');

router.post('/', upload.array('portfolio', 10),traderController.createTrader);
router.get('/', traderController.getAllTraders);
router.get('/:id', traderController.getTraderById);
router.put('/:id', traderController.updateTrader);
router.delete('/:id', traderController.deleteTrader);

module.exports = router;