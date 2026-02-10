const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
   mobile: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+[1-9]\d{7,14}$/, "Mobile number must include country code"], 
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agent", agentSchema);
