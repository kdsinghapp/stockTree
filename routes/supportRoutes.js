// routes/supportRoutes.js
const express = require("express");
const router = express.Router();
const {
  createSupportRequest,
  getAllSupportQueries,
} = require("../controllers/supportController");

router.post("/contact", createSupportRequest);
router.get("/queries", getAllSupportQueries);

module.exports = router;
