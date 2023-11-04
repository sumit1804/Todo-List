import express from "express";
import {
  TaskStatusChange,
  addTask,
  getTask,
  removeTask,
} from "../controllers/taskController.js";
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

router.post("/addTask", requireAuth, addTask);
router.get("/getTask", requireAuth, getTask);
router.delete("/removeTask", requireAuth, removeTask);

router.post("/change-status", requireAuth, TaskStatusChange);

export default router;
