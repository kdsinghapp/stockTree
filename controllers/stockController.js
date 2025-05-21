const axios = require('axios');
const Stock = require('../models/Stock');

// Fetch stocks from Twelve Data and save to MongoDB
const fetchAndSaveStocks = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.twelvedata.com/stocks', {
      params: {
        exchange: 'NSE',
        apikey: process.env.TWELVE_DATA_API_KEY,
      },
    });

    if (!data.data) {
      return res.status(400).json({ status: false, message: 'No stock data received.' });
    }

    const stocks = data.data;

    for (const stock of stocks) {
      await Stock.updateOne(
        
        { symbol: stock.symbol },
        { $set: stock },
        { upsert: true }
      );
    }

    res.json({ status: true, message: 'Stocks fetched and saved.', count: stocks.length });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: false, message: 'Error fetching stocks.' });
  }
};

// Get stocks from MongoDB
const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().limit(100); // optional: add pagination later
    res.json({ status: true, data: stocks });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Failed to fetch stocks.' });
  }
};



module.exports = {
  fetchAndSaveStocks,
  getAllStocks
}