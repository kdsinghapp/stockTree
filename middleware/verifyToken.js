const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-api-key'];

  if (!token) return res.status(401).json({ status: false, message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ status: false, message: 'User not found' });
    }

    req.user = { id: user._id };
    next();
  } catch (err) {
    res.status(401).json({ status: false, message: 'Invalid token', error: err.message });
  }
};

module.exports = verifyToken;
