const express = require('express');
const router = express.Router();

// Mock data for Stocks Tree Metrics (replace with actual database queries)
const getStockMetrics = async () => {
  // This would typically come from your trading data
  return {
    totalCalls: 326,
    exitedCalls: 305,
    successRate: 80,
    period: 'Apr 2023 to Mar 2025',
    lastUpdated: new Date()
  };
};

// Get stock trading metrics (public route)
router.get('/stocks-tree', async (req, res) => {
  try {
    const metrics = await getStockMetrics();
    
    res.json({
      success: true,
      data: {
        totalCalls: metrics.totalCalls,
        exitedCalls: metrics.exitedCalls,
        successRate: `${metrics.successRate}%`,
        period: metrics.period,
        lastUpdated: metrics.lastUpdated,
        pendingCalls: metrics.totalCalls - metrics.exitedCalls
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching metrics',
      error: error.message
    });
  }
});

module.exports = router;