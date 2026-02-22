// // Import Express framework
// import express from "express";

// // Import all task controller functions
// import {
//   createTask,
//   getTasks,
//   getTask,
//   updateTask,
//   deleteTask,
//   markComplete,
//   getDailyScore,
// } from "../controllers/taskControllers.js";

// // Import authentication middleware
// import { protect } from "../middlewares/authMiddleware.js";

// // Create router instance
// const router = express.Router();

// // 🔐 Apply protect middleware to all routes below
// // Ensures only logged-in users can access task APIs
// router.use(protect);

// // 📊 Daily stats route
// // MUST come before "/:id" otherwise "stats" will be treated as an ID
// router.get("/stats/daily", getDailyScore);

// // 📌 Get all tasks OR create new task
// router
//   .route("/")
//   .get(getTasks)      // GET /api/tasks
//   .post(createTask);  // POST /api/tasks

// // 📌 Operations on single task by ID
// router
//   .route("/:id")
//   .get(getTask)       // Get single task
//   .put(updateTask)    // Update task
//   .delete(deleteTask); // Delete task

// // ✅ Toggle task complete/pending status
// router.patch("/:id/complete", markComplete);

// // Export router
// export default router;

import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  markComplete,
  getDailyScore,
} from "../controllers/taskControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId,
  validateTaskQuery,
} from "../middlewares/validator.js";
import { createLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.use(protect);

router.get("/stats/daily", getDailyScore);

router
  .route("/")
  .get(validateTaskQuery, getTasks)
  .post(createLimiter, validateCreateTask, createTask);

router
  .route("/:id")
  .get(validateTaskId, getTask)
  .put(validateUpdateTask, updateTask)
  .delete(validateTaskId, deleteTask);

router.patch("/:id/complete", validateTaskId, markComplete);

export default router;