// Load environment variables
require("dotenv").config();

const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

// Middleware for parsing JSON bodies
app.use(express.json());

// MongoDB connection
const connectDB = require("./dbconnect");
connectDB();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Routes
const userRoutes = require("./routes/userRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const missionRoutes = require("./routes/missionRoutes");

// Use the routes
app.use("/users", userRoutes);
app.use("/assessments", assessmentRoutes);
app.use("/missions", missionRoutes);

// Serve static files from the uploads directory
app.use("/uploads", express.static(uploadsDir));

// Catch-all for undefined routes (404 Not Found)
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint Not Found",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.stack);
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
});

// Server start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
