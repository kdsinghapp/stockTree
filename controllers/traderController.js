const Trader = require('../models/Trader');

// ➕ Create a new trader
exports.createTrader = async (req, res) => {
  try {
    const trader = await Trader.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Trader created successfully',
      data: trader
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 📥 Get all traders
exports.getAllTraders = async (req, res) => {
  try {
    const traders = await Trader.find();
    res.status(200).json({
      status: 'success',
      data: traders
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 🔍 Get trader by ID
exports.getTraderById = async (req, res) => {
  try {
    const trader = await Trader.findById(req.params.id);
    if (!trader) {
      return res.status(404).json({ status: 'error', message: 'Trader not found' });
    }
    res.status(200).json({
      status: 'success',
      data: trader
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 📝 Update trader by ID
exports.updateTrader = async (req, res) => {
  try {
    const trader = await Trader.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!trader) {
      return res.status(404).json({ status: 'error', message: 'Trader not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Trader updated successfully',
      data: trader
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ❌ Delete trader by ID
exports.deleteTrader = async (req, res) => {
  try {
    const trader = await Trader.findByIdAndDelete(req.params.id);
    if (!trader) {
      return res.status(404).json({ status: 'error', message: 'Trader not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Trader deleted successfully',
      data: trader
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
