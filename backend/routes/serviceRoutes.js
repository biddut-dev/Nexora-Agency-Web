const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

// @route   GET /api/services
// @desc    Get all active services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find({ active: true });
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ success: false, error: "Server error, failed to retrieve services." });
  }
});

module.exports = router;
