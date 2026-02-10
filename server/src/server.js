require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const agentRoutes = require("./routes/agentRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// Middleware
const protect = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

//  Connect Database
connectDB();

// Global Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/upload", uploadRoutes);

//  Test / Health Route
app.get("/", (req, res) => {
  res.send("Server Running");
});

//  Protected Test Route (optional – can remove later)
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user,
  });
});

//  Error Handler (ALWAYS LAST)
app.use(errorHandler);

//  Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
