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
  completed: {
    type: Boolean,
    default: false,
  },
  hour: {
    type: String,
  },
  day: {
    type: String,
  },
  usercreator: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
