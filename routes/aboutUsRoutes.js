const express = require("express");
const router = express.Router();
const aboutUsController = require("../controllers/aboutUsController");

// Define routes
router.get("/", aboutUsController.getAboutUs);
router.post("/", aboutUsController.createAboutUs);
router.put("/:id", aboutUsController.updateAboutUs);

module.exports = router;
