const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const Plan = require('../models/Plan');
const authController = require('../controllers/authController');

// Subscribe to a plan
router.post('/subscribe', authController, async (req, res) => {
  try {
    const { planId, paymentMethod } = req.body;
    const userId = req.user.id;

    // Check if plan exists
    const plan = await Plan.findById(planId);
    if (!plan || !plan.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found or inactive'
      });
    }

    // Check if user already has an active subscription
    const existingSubscription = await Subscription.findOne({
      userId,
      status: 'active'
    });

    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        message: 'You already have an active subscription'
      });
    }

    // Calculate subscription end date
    const startDate = new Date();
    const endDate = new Date(startDate);
    
    switch (plan.durationType) {
      case 'days':
        endDate.setDate(endDate.getDate() + plan.duration);
        break;
      case 'weeks':
        endDate.setDate(endDate.getDate() + (plan.duration * 7));
        break;
      case 'months':
        endDate.setMonth(endDate.getMonth() + plan.duration);
        break;
      case 'years':
        endDate.setFullYear(endDate.getFullYear() + plan.duration);
        break;
    }

    // Create subscription
    const subscription = new Subscription({
      userId,
      planId,
      startDate,
      endDate,
      price: plan.getDiscountedPrice(),
      originalPrice: plan.price,
      paymentMethod,
      status: 'active'
    });

    await subscription.save();

    // Update plan user count
    await Plan.findByIdAndUpdate(planId, {
      $inc: { currentUsers: 1 }
    });

    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      data: subscription
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating subscription',
      error: error.message
    });
  }
});

// Get user's subscriptions
router.get('/my-subscriptions', authController, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      userId: req.user.id
    }).populate('planId').sort({ createdAt: -1 });

    res.json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subscriptions',
      error: error.message
    });
  }
});

// Get current active subscription
router.get('/current', authController, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      userId: req.user.id,
      status: 'active'
    }).populate('planId');

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found'
      });
    }

    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching current subscription',
      error: error.message
    });
  }
});

// Cancel subscription
router.put('/cancel/:subscriptionId', authController, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.subscriptionId,
      userId: req.user.id
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    subscription.status = 'cancelled';
    subscription.cancelledAt = new Date();
    await subscription.save();

    // Update plan user count
    await Plan.findByIdAndUpdate(subscription.planId, {
      $inc: { currentUsers: -1 }
    });

    res.json({
      success: true,
      message: 'Subscription cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling subscription',
      error: error.message
    });
  }
});

module.exports = router;