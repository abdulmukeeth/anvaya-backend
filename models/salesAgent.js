const mongoose = require("mongoose");

const salesAgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Agent name is required"],
    trim: true,
    minlength: [2, "Agent name must be at least 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SalesAgent", salesAgentSchema);