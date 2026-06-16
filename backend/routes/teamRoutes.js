const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

// Fallback values for existing team members
const FALLBACKS = {
  TM001: {
    bio: "Dynamic Social Media Manager specializing in content curation, audience engagement analytics, and cross-channel community building.",
    certifications: ["HubSpot Social Media Strategy", "Google Digital Marketing Certificate", "Facebook Certified Creative Associate"],
    projects: ["Creative Visual Identity", "Content Calendar Automation", "Engagement Booster 2025"]
  },
  TM002: {
    bio: "Creative Social Media Manager specializing in brand building, visual aesthetics, audience engagement strategies, and viral growth hacking across major platforms.",
    certifications: ["Facebook Blueprint Certified Associate", "HubSpot Social Media Certification", "Google Ads Measurement Certification"],
    projects: ["Viral Launch Campaign 2025", "Visual Identity Refresh", "Growth Ads Funnel"]
  },
  TM003: {
    bio: "Senior Sales & Marketing Strategist specializing in corporate business growth, client relations, sales pipeline optimization, and lead generation campaigns.",
    certifications: ["HubSpot Inbound Sales Certificate", "Strategic B2B Selling Certificate", "Google Analytics Individual Qualification"],
    projects: ["Enterprise Partnership Launch", "CRM Setup & Integration", "B2B Sales Outreach Hack"]
  },
  TM004: {
    bio: "Full-Stack Web Developer passionate about constructing modern, accessible, and fast web applications using JavaScript, Node.js, and MongoDB.",
    certifications: ["Meta Front-End Developer Certificate", "MERN Stack Specialist Certificate", "Responsive Web Design (FreeCodeCamp)"],
    projects: ["Nexora Chatbot Widget", "Reviews and Feedback API", "Client Intake Forms"]
  },
  TM005: {
    bio: "Founder & CEO of Nexora Agency. Leads business strategy, strategic planning, and overall technology vision with 8+ years of startup leadership experience.",
    certifications: ["Certified ScrumMaster (CSM)", "AWS Certified Cloud Practitioner", "Google Project Management Certificate"],
    projects: ["Nexora Core Platform", "Corporate Brand Portal", "E-Commerce Suite"]
  }
};

// @route   GET /api/team
// @desc    Get all active team members
router.get("/", async (req, res) => {
  try {
    const teamMembers = await Team.find({ active: true });
    
    // Map team members and insert fallbacks if fields are empty
    const enrichedTeam = teamMembers.map(member => {
      const plainMember = member.toObject();
      const fallback = FALLBACKS[plainMember.memberId] || {};

      return {
        ...plainMember,
        bio: plainMember.bio || fallback.bio || "Team member at Nexora Agency.",
        certifications: plainMember.certifications && plainMember.certifications.length > 0
          ? plainMember.certifications 
          : (fallback.certifications || []),
        projects: plainMember.projects && plainMember.projects.length > 0
          ? plainMember.projects 
          : (fallback.projects || [])
      };
    });

    res.json(enrichedTeam);
  } catch (error) {
    console.error("Error fetching team:", error);
    res.status(500).json({ success: false, error: "Server error, failed to retrieve team members." });
  }
});

module.exports = router;
