const Banner = require('../models/Banner');
const baseImgUrl = process.env.BASE_IMG_URL

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

    banners.map((img) => {
      // img.image? img.image = `${baseImgUrl}/${img.image}` : null
      img.image = `${baseImgUrl}/${img.image}`
      console.log(img.image)
    })
    res.status(200).json({
      status: true,
      data: banners
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

