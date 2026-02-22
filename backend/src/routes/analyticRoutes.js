// import express from "express";
// import {
//   getStreak,
//   getConsistencyScore,
//   getWeeklyStats,
//   getMonthlyStats,
//   getDashboardOverview,
// } from "../controllers/analyticsControllers.js";
// import { protect } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// // Protect all routes
// router.use(protect);

// // Analytics endpoints
// router.get("/streak", getStreak);
// router.get("/consistency", getConsistencyScore);
// router.get("/weekly", getWeeklyStats);
// router.get("/monthly", getMonthlyStats);
// router.get("/dashboard", getDashboardOverview);

// export default router;

import express from "express";
import {
  getStreak,
  getConsistencyScore,
  getWeeklyStats,
  getMonthlyStats,
  getDashboardOverview,
  getHeatmapData,
  getSmartInsights,
  getProductivityPatterns,
} from "../controllers/analyticsControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protect all routes
router.use(protect);

// Day 10 - Basic Analytics
router.get("/streak", getStreak);
router.get("/consistency", getConsistencyScore);
router.get("/weekly", getWeeklyStats);
router.get("/monthly", getMonthlyStats);
router.get("/dashboard", getDashboardOverview);

// Day 11 - Advanced Analytics
router.get("/heatmap", getHeatmapData);
router.get("/insights", getSmartInsights);
router.get("/patterns", getProductivityPatterns);

export default router;