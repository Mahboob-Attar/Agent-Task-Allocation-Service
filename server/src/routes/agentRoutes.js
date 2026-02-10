const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  uploadCSV,
  getAllTasks
} = require("../controllers/uploadController");

router.post("/", protect, upload.single("file"), uploadCSV);
router.get("/tasks", protect, getAllTasks);

module.exports = router;
