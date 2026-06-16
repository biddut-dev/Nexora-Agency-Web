const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  memberId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true
  },
  phone: String,
  email: String,
  facebook: String,
  instagram: String,
  linkedin: String,
  active: {
    type: Boolean,
    default: true
  },
  // Extended fields for member portfolio with default values if not defined in the database
  bio: {
    type: String,
    default: ""
  },
  certifications: {
    type: [String],
    default: []
  },
  projects: {
    type: [String],
    default: []
  }
}, { collection: "team_members" });

module.exports = mongoose.model("Team", TeamSchema);
