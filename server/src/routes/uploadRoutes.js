const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  uploadCSV,
  getAllTasks
} = require("../controllers/uploadController");

router.post("/", protect, uploadCSV);
router.get("/tasks", protect, getAllTasks);

module.exports = router;
