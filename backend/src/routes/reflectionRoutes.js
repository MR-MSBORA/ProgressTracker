import express from "express";
import {
  createReflection,
  getReflections,
  getReflection,
  updateReflection,
  deleteReflection,
  getCurrentWeekReflection,
  checkSunday,
  getReflectionStats,
} from "../controllers/reflectionControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protect all routes
router.use(protect);

// Special routes (must come before /:id)
router.get("/stats/summary", getReflectionStats);
router.get("/current/week", getCurrentWeekReflection);
router.get("/check/sunday", checkSunday);

// Main CRUD routes
router.route("/").get(getReflections).post(createReflection);

router
  .route("/:id")
  .get(getReflection)
  .put(updateReflection)
  .delete(deleteReflection);

export default router;