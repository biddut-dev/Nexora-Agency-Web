const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    default: ""
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    required: true
  },
  service: {
    type: String,
    default: "General"
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0]
  },
  featured: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Review", ReviewSchema);
