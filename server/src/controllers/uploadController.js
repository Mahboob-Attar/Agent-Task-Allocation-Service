const Agent = require("../models/Agent");
const Task = require("../models/Task");
const parseFile = require("../utils/parseFile");
const distributeTasks = require("../utils/distributeTasks");

// UPLOAD & DISTRIBUTE CSV
exports.uploadCSV = async (req, res, next) => {
  try {
    //  File validation
    if (!req.file) {
      const error = new Error("File is required");
      error.statusCode = 400;
      throw error;
    }

    //  Parse file
    const rows = parseFile(req.file.buffer);

    if (!rows || rows.length === 0) {
      const error = new Error("Uploaded file is empty or invalid format");
      error.statusCode = 400;
      throw error;
    }

    //  Validate required columns
    const requiredFields = ["FirstName", "Phone", "Notes"];

    const hasValidFormat = requiredFields.every(field =>
      Object.keys(rows[0]).includes(field)
    );

    if (!hasValidFormat) {
      const error = new Error(
        "Invalid file format. Required columns: FirstName, Phone, Notes"
      );
      error.statusCode = 400;
      throw error;
    }

    // Fetch agents
    const agents = await Agent.find();

    if (agents.length !== 5) {
      const error = new Error("Exactly 5 agents are required for distribution");
      error.statusCode = 400;
      throw error;
    }

    //  Distribute tasks sequentially
    const tasksToInsert = distributeTasks(rows, agents);

    if (!tasksToInsert || tasksToInsert.length === 0) {
      const error = new Error("Task distribution failed");
      error.statusCode = 500;
      throw error;
    }

    // Save tasks in DB
    await Task.insertMany(tasksToInsert);

    //  Success response
    res.status(201).json({
      success: true,
      message: "CSV uploaded and tasks distributed successfully",
      totalTasks: tasksToInsert.length,
    });

  } catch (error) {
    next(error);
  }
};


// GET ALL TASKS (Admin View)
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate("agent", "name email");

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });

  } catch (error) {
    next(error);
  }
};
