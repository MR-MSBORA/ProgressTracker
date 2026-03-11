import express from "express";
import {
  getStreak,
  getHeatmapData,
  getWeeklySummary,
  getDashboardOverview,
  getProductivityPatterns,
  getSmartInsights,
} from "../controllers/analyticsControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect); // Protects all routes below

router.get("/streak", getStreak);
router.get("/heatmap", getHeatmapData);
router.get("/weekly-summary", getWeeklySummary);
router.get("/dashboard", getDashboardOverview);
router.get("/patterns", getProductivityPatterns);
router.get("/insights", getSmartInsights);

export default router;