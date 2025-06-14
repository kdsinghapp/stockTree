// controllers/supportController.js
const Support = require('../models/Support');

exports.createSupportRequest = async (req, res) => {
  try {
    const { fullName, email, details } = req.body;

    if (!fullName || !email || !details) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const supportEntry = new Support({ fullName, email, details });
    await supportEntry.save();

    res.status(201).json({ success: true, message: "Support request submitted successfully" });
  } catch (error) {
    console.error("Support Request Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
exports.getAllSupportQueries = async (req, res) => {
  try {
    const supportQueries = await Support.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({
      success: true,
      data: supportQueries,
    });
  } catch (error) {
    console.error("Error fetching support queries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve support queries",
    });
  }
};
