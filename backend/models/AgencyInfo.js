const mongoose = require("mongoose");

const AgencyInfoSchema = new mongoose.Schema({
  agencyId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  phone: String,
  email: String,
  facebook: String,
  instagram: String,
  active: {
    type: Boolean,
    default: true
  }
}, { collection: "agency_info" });

module.exports = mongoose.model("AgencyInfo", AgencyInfoSchema);
