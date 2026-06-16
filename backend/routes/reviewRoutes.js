const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// @route   GET /api/reviews
// @desc    Get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ _id: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, error: "Server error, failed to retrieve reviews." });
  }
});

// @route   POST /api/reviews
// @desc    Create a review
router.post("/", async (req, res) => {
  try {
    const { name, stars, comment } = req.body;

    if (!name || !stars || !comment) {
      return res.status(400).json({ success: false, error: "Please fill in all fields." });
    }

    const ratingNumber = Number(stars);
    if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
      return res.status(400).json({ success: false, error: "Rating must be a number between 1 and 5." });
    }

    const newReview = new Review({
      clientName: name,
      rating: ratingNumber,
      review: comment
    });

    await newReview.save();

    res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ success: false, error: "Server error, please try again later." });
  }
});

module.exports = router;
