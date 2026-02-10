const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");

// CREATE AGENT
exports.createAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await Agent.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = await Agent.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    res.status(201).json(agent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL AGENTS
exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select("-password");
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
