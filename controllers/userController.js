const User = require('../models/User'); // Adjust path if needed


// GET /api/user/profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // set via verifyToken middleware
    const user = await User.findById(userId).select('-password -otp');

    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    const responseUser = user.toObject();

    // Extract only the filename from the stored path
    if (responseUser.profileImage) {
      responseUser.profileImage = responseUser.profileImage.split('/').pop().split('\\').pop();
    }

    res.json({
      status: true,
      message: 'Profile fetched',
      data: responseUser
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Server error', error: err.message });
  }
};



// PUT /api/user/profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId, "=========>");

    // Extract data from request body
    const { fullName, nickname, dateOfBirth, phone, gender } = req.body;

    // Prepare update object
    const updateFields = {
      fullName,
      nickname,
      dateOfBirth,
      phone,
      gender,
    };

    // If a file was uploaded, set profileImage path
    if (req.file) {
      updateFields.profileImage = req.file.path; // relative path (e.g., 'uploads/profileImage-1234.png')
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    ).select('-password -otp');

    if (!updatedUser) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

const responseUser = updatedUser.toObject();

if (updatedUser.profileImage) {
  // Extract only the file name from path like 'uploads/profileImage-xxx.png'
  responseUser.profileImage = updatedUser.profileImage.split('/').pop().split('\\').pop();
}

res.json({
  status: true,
  message: 'Profile updated',
  data: responseUser
});
  } catch (err) {
    res.status(500).json({ status: false, message: 'Server error', error: err.message });
  }
};


const uploadProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { profileImage } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage },
      { new: true }
    ).select('-password -otp');

    if (!user) return res.status(404).json({ status: false, message: 'User not found' });

    res.json({ status: true, message: 'Profile image updated', data: user });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Server error', error: err.message });
  }
};


module.exports = {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
};
