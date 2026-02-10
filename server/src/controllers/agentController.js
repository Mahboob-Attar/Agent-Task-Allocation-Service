const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");

// CREATE AGENT
exports.createAgent = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    const exists = await Agent.findOne({ email });
    if (exists) {
      const error = new Error("Agent already exists");
      error.statusCode = 400;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = await Agent.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Agent created successfully",
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
      },
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

// GET ALL AGENTS
exports.getAgents = async (req, res, next) => {
  try {
    const agents = await Agent.find();

    res.status(200).json({
      success: true,
      count: agents.length,
      agents,
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};
