const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
  faqId: {
    type: String,
    required: true,
    unique: true
  },
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true
  }
}, { collection: "faq" }); // Explicitly bind to existing collection "faq"

module.exports = mongoose.model("FAQ", FAQSchema);
