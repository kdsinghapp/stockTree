const axios = require('axios');
const Index = require('../models/Index');

const fetchAndSaveIndices = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.twelvedata.com/stocks', {
      params: {
        exchange: 'NSE',
        type: 'index',
        apikey: process.env.TWELVE_DATA_API_KEY,
      },
    });

    if (!data.data) {
      return res.status(400).json({ status: false, message: 'No index data found.' });
    }

    const indices = data.data;

    for (const index of indices) {
      await Index.updateOne(
        { symbol: index.symbol },
        { $set: index },
        { upsert: true }
      );
    }

    res.json({ status: true, message: 'Indices saved.', count: indices.length });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: false, message: 'Error fetching indices.' });
  }
};

const getAllIndices = async (req, res) => {
  try {
    const indices = await Index.find().limit(100);
    res.json({ status: true, data: indices });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Error getting indices.' });
  }
};


module.exports= {getAllIndices,fetchAndSaveIndices}