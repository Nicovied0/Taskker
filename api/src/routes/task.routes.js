const express = require("express");
const router = express.Router();

const {
  getAllTask,
  getTasklById,
  deleteTaskById,
  updateTaskById,
  getUserTasks
} = require("../controller/task.controller");

router.get("/", getAllTask);
router.get("/user/:id", getUserTasks);
router.get("/:id", getTasklById);
router.put("/:id", updateTaskById);
router.delete("/", deleteTaskById);

module.exports = router;
