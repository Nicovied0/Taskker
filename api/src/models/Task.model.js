const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  meetingUrl: {
    type: String,
  },
  organization: {
    type: String,
  },
  hour: {
    type: String,
  },
  day: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = User;
