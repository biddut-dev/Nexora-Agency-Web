const express = require("express");
const router = express.Router();
const FAQ = require("../models/FAQ");

// @route   GET /api/faqs
// @desc    Get all FAQs
router.get("/", async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({ success: false, error: "Server error, failed to retrieve FAQs." });
  }
});

module.exports = router;
