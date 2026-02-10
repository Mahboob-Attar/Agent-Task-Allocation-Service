const Agent = require("../models/Agent");
const Task = require("../models/Task");
const parseFile = require("../utils/parseFile");
const distributeTasks = require("../utils/distributeTasks");

// UPLOAD & DISTRIBUTE CSV
exports.uploadCSV = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("File is required");
    }

    // Parse file using utility
    const rows = parseFile(req.file.buffer);

    // Get agents
    const agents = await Agent.find();
    if (agents.length < 5) {
      throw new Error("Minimum 5 agents required");
    }

    // Distribute tasks using utility
    const tasks = distributeTasks(rows, agents);

    // Save tasks
    await Task.insertMany(tasks);

    res.status(201).json({
      success: true,
      message: "CSV uploaded and distributed successfully",
      totalTasks: tasks.length,
    });

  } catch (error) {
    next(error); // send to centralized error handler
  }
};


// GET ALL TASKS (ADMIN VIEW)
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate("agent", "name email");

    res.status(200).json({
      success: true,
      data: tasks,
    });

  } catch (error) {
    next(error);
  }
};
