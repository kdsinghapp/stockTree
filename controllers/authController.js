const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTP, verifyOTP } = require("../utils/twilioUtil");

exports.signup = async (req, res) => {
  let { email, password, fullName, membershipTier, phone } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Normalize phone number (assumes India, modify if needed)
    phone = phone.startsWith('+') ? phone : `+91${phone}`;

    const user = await User.create({
      email,
      password: hashedPassword,
      fullName,
      membershipTier,
      phone,
      isVerified: false
    });

    await sendOTP(phone); // now always E.164
    res.status(201).json({
      status: true,
      message: 'User created. OTP sent to phone.',
      userId: user._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 
exports.verifySignupOTP = async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

    const verificationResult = await verifyOTP(user.phone, code);
    if (verificationResult.status !== 'approved') {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'OTP verified. Account activated.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  const { email, password, deviceToken } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (!user.isVerified) {
      return res.status(403).json({ message: 'Account not verified' });
    }
    if (deviceToken) {
      user.deviceToken = deviceToken;
      await user.save();
    }
    // 
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '365d' } // 1 year expiration
    );

    res.status(200).json({
      status: 'true',
      message: 'Login successful', token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({
      status: 'false',
      message: 'User not found'
    });

    user.otp = generateOTP();
    await user.save();

    res.status(200).json({
      status: 'true',
      message: 'OTP sent to email (static: 9999)', otp: user.otp
    }); // Include OTP for testing
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    user.otp = null;
    await user.save();

    res.status(200).json({
      status: 'true',
      message: 'OTP verified. You can now reset your password.'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      status: 'true',
      message: 'Password updated successfully.'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { fullName, nickname, dateOfBirth, phone, gender, profileImage } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.fullName = fullName || user.fullName;
    user.nickname = nickname || user.nickname;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.profileImage = profileImage || user.profileImage;

    await user.save();

    res.status(200).json({
      status: 'true',
      message: 'Profile updated successfully.',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.tempHello = async (req, res) => {
  res.status(200).json({
    status: 'true',
    message: 'Hello'
  });
};


