import express from "express";
import {
  createSkill,
  getSkills,
  getSkill,
  updateSkill,
  deleteSkill,
  logPractice,
  getPracticeHistory,
  getSkillStats,
} from "../controllers/skillControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protect all routes
router.use(protect);

// Stats route (must come before /:id)
router.get("/stats/summary", getSkillStats);

// Main CRUD routes
router.route("/").get(getSkills).post(createSkill);

router.route("/:id").get(getSkill).put(updateSkill).delete(deleteSkill);

// Practice logging routes
router.route("/:id/practice").post(logPractice).get(getPracticeHistory);

export default router;