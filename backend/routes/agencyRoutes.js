const express = require("express");
const router = express.Router();
const AgencyInfo = require("../models/AgencyInfo");

// Fallback values for Agency Info
const FALLBACK_AGENCY = {
  agencyId: "AG001",
  name: "Nexora Agency",
  phone: "+8801778627380",
  email: "official.nexora.agency@gmail.com",
  facebook: "https://www.facebook.com/share/18pD6XXvQk/",
  instagram: "https://www.instagram.com/nexora_agency_bd?igsh=MWRhM3oxbXluYnpzNw==",
  active: true
};

// @route   GET /api/agency
// @desc    Get active agency information
router.get("/", async (req, res) => {
  try {
    const info = await AgencyInfo.findOne({ active: true });
    if (info) {
      res.json(info);
    } else {
      res.json(FALLBACK_AGENCY);
    }
  } catch (error) {
    console.error("Error fetching agency info:", error);
    res.json(FALLBACK_AGENCY); // Soft fallback on error
  }
});

module.exports = router;
