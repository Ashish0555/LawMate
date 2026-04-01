const express = require("express");

const router = express.Router();

// Import routes
const questionRoutes = require("./questionRoutes");
const messageRoutes = require("./messageRoutes");

// Base route (health check)
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Legal consultation backend API is live 🚀",
  });
});

const authRoutes = require("./authRoutes");

router.use("/auth", authRoutes);

// Register feature routes
router.use("/questions", questionRoutes);
router.use("/messages", messageRoutes);

module.exports = router;