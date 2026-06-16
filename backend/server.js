const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");
const path = require("path");
require("dotenv").config();

// Configure DNS to resolve MongoDB Atlas SRV records correctly
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const contactRoutes = require("./routes/contactRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/reviews", reviewRoutes);

// Database Connection
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGO_URI);
};

connectDB()
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch(err => console.log("MongoDB connection error:", err));

// Start server locally or on persistent host
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
  });
}

// Export app for Vercel serverless environment
module.exports = app;