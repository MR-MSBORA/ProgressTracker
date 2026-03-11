// // import express from "express";
// // import {
// //   createTask,
// //   getTasks,
// //   getTask,
// //   updateTask,
// //   deleteTask,
// //   markComplete,
// //   getDailyScore,
// // } from "../controllers/taskControllers.js";
// // import { protect } from "../middlewares/authMiddleware.js";
// // import {
// //   validateCreateTask,
// //   validateUpdateTask,
// //   validateTaskId,
// //   validateTaskQuery,
// // } from "../middlewares/validator.js";
// // import { createLimiter } from "../middlewares/rateLimiter.js";

// // const router = express.Router();

// // router.use(protect);

// // // ⚠️ MUST be before /:id routes
// // router.get("/stats/daily", getDailyScore);

// // router
// //   .route("/")
// //   .get(validateTaskQuery, getTasks)
// //   .post(createLimiter, validateCreateTask, createTask);

// // router
// //   .route("/:id")
// //   .get(validateTaskId, getTask)
// //   .put(validateUpdateTask, updateTask)
// //   .delete(validateTaskId, deleteTask);

// // // ✅ Toggle complete — MUST be after /:id route definition
// // router.patch("/:id/complete", markComplete);

// // export default router;









// import express from "express";
// import {
//   createTask,
//   getTasks,
//   getTask,
//   updateTask,
//   deleteTask,
//   markComplete,
//   getDailyScore,
// } from "../controllers/taskControllers.js";

// import { protect } from "../middlewares/authMiddleware.js";

// import {
//   validateCreateTask,
//   validateUpdateTask,
//   validateTaskId,
//   validateTaskQuery,
// } from "../middlewares/validator.js";

// import { createLimiter } from "../middlewares/rateLimiter.js";

// const router = express.Router();

// // Protect all routes
// router.use(protect);

// // ⚠️ IMPORTANT: must come before /:id routes
// router.get("/stats/daily", getDailyScore);

// // ========================================
// // TASK COLLECTION ROUTES
// // ========================================
// router
//   .route("/")
//   .get(validateTaskQuery, getTasks)
//   .post(createLimiter, validateCreateTask, createTask);

// // ========================================
// // SINGLE TASK ROUTES
// // ========================================
// router
//   .route("/:id")
//   .get(validateTaskId, getTask)
//   .put(validateUpdateTask, updateTask)
//   .delete(validateTaskId, deleteTask);

// // ========================================
// // TOGGLE COMPLETE
// // ========================================
// // No validateTaskId here (handled inside controller)
// router.patch("/:id/complete", markComplete);

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

// ⚠️ MUST be before /:id routes
router.get("/stats/daily", getDailyScore);

router
  .route("/")
  .get(...validateTaskQuery, getTasks)
  .post(createLimiter, ...validateCreateTask, createTask);

router
  .route("/:id")
  .get(...validateTaskId, getTask)
  .put(...validateUpdateTask, updateTask)
  .delete(...validateTaskId, deleteTask);

router.patch("/:id/complete", markComplete);

export default router;