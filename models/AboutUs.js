const mongoose = require("mongoose");

const AboutUsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AboutUs", AboutUsSchema);
