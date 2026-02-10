const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createAgent,
  getAgents
} = require("../controllers/agentController");

router.post("/", protect, createAgent);
router.get("/", protect, getAgents);

module.exports = router;
