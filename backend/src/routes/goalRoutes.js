import express from "express";
import {
  createGoal,
  getGoals,
  getGoal,
  updateGoal,
  deleteGoal,
  updateProgress,
  getGoalStats,
} from "../controllers/goalControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protect all routes
router.use(protect);

// Stats route (must come before /:id)
router.get("/stats/summary", getGoalStats);

// Main routes
router.route("/").get(getGoals).post(createGoal);

router.route("/:id").get(getGoal).put(updateGoal).delete(deleteGoal);

// Update progress
router.patch("/:id/progress", updateProgress);

export default router;