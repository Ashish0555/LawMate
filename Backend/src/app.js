const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/healthRoutes");
const apiRoutes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(express.json({ limit: "10kb" }));
app.use(cors());

// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Legal consultation backend is live 🚀",
    endpoints: {
      api: "/api",
      health: "/health",
    },
  });
});

// Routes
app.use("/health", healthRoutes);
app.use("/api", apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use(errorHandler);

module.exports = app;
