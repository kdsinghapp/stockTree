const AboutUs = require("../models/AboutUs");

// GET: Get latest About Us info
exports.getAboutUs = async (req, res) => {
  try {
    const data = await AboutUs.find().sort({ updatedAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching About Us info", error });
  }
};

// POST: Create new About Us
exports.createAboutUs = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newEntry = new AboutUs({ title, content });
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creating About Us", error });
  }
};

// PUT: Update existing About Us by ID
exports.updateAboutUs = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await AboutUs.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating About Us", error });
  }
};
