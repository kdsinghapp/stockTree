const Banner = require('../models/Banner');

exports.createBanner = async (req, res) => {
  try {
    const image = req.file?.path.replace(/\\/g, '/');
    const banner = await Banner.create({
      ...req.body,
      image
    });
    res.status(201).json({
      status: true,
      message: 'Banner created',
      data: banner
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ status: 'active' });
    res.status(200).json({
      status: true,
      data: banners
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

