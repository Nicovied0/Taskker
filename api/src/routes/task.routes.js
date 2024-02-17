const express = require("express");
const router = express.Router();

const {
  getAllTask,
  getTasklById,
  deleteTaskById,
  updateTaskById,
  getUserTasks,
  createTask
} = require("../controller/task.controller");

router.get("/", getAllTask);
router.get("/user/:id", getUserTasks);
router.get("/:id", getTasklById);
router.put("/:id", updateTaskById);
router.post("/", createTask);
router.delete("/", deleteTaskById);

module.exports = router;
