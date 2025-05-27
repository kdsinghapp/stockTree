const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');

// Get all plans (public route)
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort({ price: 1 });
    res.json({
      success: true,
      data: plans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching plans',
      error: error.message
    });
  }
});

// Get plan by ID (public route)
router.get('/:id', async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    res.json({
      success: true,
      data: plan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching plan',
      error: error.message
    });
  }
});

// Create new plan (for now, no auth required - you can add auth later)
router.post('/', async (req, res) => {
  try {
    const {
      name,
      price,
      duration,
      durationType,
      features,
      description,
      planType,
      isPopular
    } = req.body;

    const plan = new Plan({
      name,
      price,
      duration,
      durationType,
      features,
      description,
      planType,
      isPopular: isPopular || false,
      isActive: true
    });

    await plan.save();
    res.status(201).json({
      success: true,
      message: 'Plan created successfully',
      data: plan
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating plan',
      error: error.message
    });
  }
});

// Update plan
router.put('/:id', async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    res.json({
      success: true,
      message: 'Plan updated successfully',
      data: plan
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating plan',
      error: error.message
    });
  }
});

// Delete plan (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    res.json({
      success: true,
      message: 'Plan deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting plan',
      error: error.message
    });
  }
});

module.exports = router;