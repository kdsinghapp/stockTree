const express = require('express');
const router = express.Router();

// Get latest market insights (public route)
router.get('/latest', async (req, res) => {
  try {
    const insights = {
      title: 'Latest Insites',
      subtitle: 'Up-most trends in the market with details of there stocks trends at your hand',
      featured: {
        title: 'Market Outlook for This Week',
        description: 'Nifty showing bullish momentum with banking stocks leading the rally',
        image: '/api/placeholder/400/200',
        readTime: '5 min read',
        publishedAt: new Date()
      },
      trending: [
        {
          id: 1,
          title: 'Tech Stocks Surge Amid AI Boom',
          summary: 'Technology sector witnesses unprecedented growth',
          category: 'Technology',
          readTime: '3 min'
        },
        {
          id: 2,
          title: 'Banking Sector Analysis',
          summary: 'RBI policy impact on major banking stocks',
          category: 'Banking',
          readTime: '4 min'
        },
        {
          id: 3,
          title: 'Commodity Market Update',
          summary: 'Gold and silver prices show strong momentum',
          category: 'Commodities',
          readTime: '2 min'
        }
      ]
    };

    res.json({
      success: true,
      data: insights
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching insights',
      error: error.message
    });
  }
});

module.exports = router;