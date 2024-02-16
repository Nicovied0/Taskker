const Task = require("../models/Task.model");

async function getAllTask(req, res) {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    return res.status(500).json({ error: "Error fetching tasks" });
  }
}

async function getTasklById(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "task not found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task by ID:", error.message);
    return res.status(500).json({ error: "Error fetching task by ID" });
  }
}

async function getUserTasks(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "task not found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task by ID:", error.message);
    return res.status(500).json({ error: "Error fetching task by ID" });
  }
}

async function deleteTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "task not found" });
    }
    await task.remove();
    return res.status(204).end();
  } catch (error) {
    console.error("Error deleting task:", error.message);
    return res.status(500).json({ error: "Error deleting task" });
  }
}

async function updateTaskById(req, res) {
  try {
    const { title, description, meetingUrl, completed, hour, day } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        meetingUrl,
        completed,
        hour,
        day,
      },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "task not found" });
    }
    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error.message);
    return res.status(500).json({ error: "Error updating task" });
  }
}

module.exports = {
  getAllTask,
  getTasklById,
  updateTaskById,
  deleteTaskById,
  getUserTasks,
};
