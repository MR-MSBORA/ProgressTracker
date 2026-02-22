import { body, param, query, validationResult } from "express-validator";

// ============================================
// GLOBAL VALIDATION HANDLER
// ============================================

// Middleware to check validation errors
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  // If validation errors exist, return 400 response
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => err.msg),
    });
  }

  next(); // Continue if no errors
};

// ============================================
// AUTHENTICATION VALIDATORS
// ============================================

// Validate user registration input
export const validateRegister = [
  body("name")
    .trim() // Remove extra spaces
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email")
    .normalizeEmail(), // Normalize email format

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  validate,
];

// Validate login input
export const validateLogin = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required"),

  validate,
];

// ============================================
// TASK VALIDATORS
// ============================================

// Validate task creation
export const validateCreateTask = [
  body("title")
    .trim()
    .notEmpty().withMessage("Task title is required")
    .isLength({ max: 100 }).withMessage("Title cannot exceed 100 characters"),

  body("description")
    .optional() // Field is optional
    .trim()
    .isLength({ max: 500 }).withMessage("Description cannot exceed 500 characters"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"]).withMessage("Priority must be low, medium, or high"),

  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Status must be pending, in-progress, or completed"),

  body("dueDate")
    .optional()
    .isISO8601().withMessage("Due date must be a valid date"),

  validate,
];

// Validate task update
export const validateUpdateTask = [
  param("id")
    .isMongoId().withMessage("Invalid task ID"), // Validate MongoDB ID

  body("title")
    .optional()
    .trim()
    .notEmpty().withMessage("Title cannot be empty")
    .isLength({ max: 100 }).withMessage("Title cannot exceed 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage("Description cannot exceed 500 characters"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"]).withMessage("Priority must be low, medium, or high"),

  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Status must be pending, in-progress, or completed"),

  validate,
];

// Validate task ID param only
export const validateTaskId = [
  param("id").isMongoId().withMessage("Invalid task ID"),
  validate,
];

// Validate task query filters
export const validateTaskQuery = [
  query("date")
    .optional()
    .isISO8601().withMessage("Date must be in YYYY-MM-DD format"),

  query("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"]).withMessage("Invalid status"),

  query("priority")
    .optional()
    .isIn(["low", "medium", "high"]).withMessage("Invalid priority"),

  validate,
];

// ============================================
// GOAL VALIDATORS
// ============================================

// Validate goal creation
export const validateCreateGoal = [
  body("title")
    .trim()
    .notEmpty().withMessage("Goal title is required")
    .isLength({ max: 100 }).withMessage("Title cannot exceed 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage("Description cannot exceed 500 characters"),

  body("target")
    .notEmpty().withMessage("Target is required")
    .isInt({ min: 1 }).withMessage("Target must be a positive number"),

  body("period")
    .optional()
    .isIn(["daily", "weekly", "monthly"])
    .withMessage("Period must be daily, weekly, or monthly"),

  body("endDate")
    .notEmpty().withMessage("End date is required")
    .isISO8601().withMessage("End date must be a valid date"),

  validate,
];

// Validate goal update
export const validateUpdateGoal = [
  param("id").isMongoId().withMessage("Invalid goal ID"),

  body("target")
    .optional()
    .isInt({ min: 1 }).withMessage("Target must be a positive number"),

  validate,
];

// Validate goal progress update
export const validateGoalProgress = [
  param("id").isMongoId().withMessage("Invalid goal ID"),

  body("increment")
    .notEmpty().withMessage("Increment is required")
    .isInt({ min: 1 }).withMessage("Increment must be a positive number"),

  validate,
];

// ============================================
// SKILL VALIDATORS
// ============================================

// Validate skill creation
export const validateCreateSkill = [
  body("name")
    .trim()
    .notEmpty().withMessage("Skill name is required")
    .isLength({ max: 50 }).withMessage("Name cannot exceed 50 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage("Description cannot exceed 200 characters"),

  body("category")
    .optional()
    .isIn(["programming", "language", "music", "art", "sport", "business", "other"])
    .withMessage("Invalid category"),

  body("level")
    .optional()
    .isIn(["beginner", "intermediate", "advanced", "expert"])
    .withMessage("Invalid level"),

  body("targetHours")
    .optional()
    .isInt({ min: 1 }).withMessage("Target hours must be a positive number"),

  validate,
];

// Validate skill practice log
export const validateLogPractice = [
  param("id").isMongoId().withMessage("Invalid skill ID"),

  body("duration")
    .notEmpty().withMessage("Duration is required")
    .isInt({ min: 1 }).withMessage("Duration must be at least 1 minute"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage("Notes cannot exceed 500 characters"),

  validate,
];

// ============================================
// REFLECTION VALIDATORS
// ============================================

// Validate weekly reflection
export const validateCreateReflection = [
  body("weekRating")
    .notEmpty().withMessage("Week rating is required")
    .isInt({ min: 1, max: 10 }).withMessage("Week rating must be between 1 and 10"),

  body("wins")
    .optional()
    .isArray().withMessage("Wins must be an array"),

  body("challenges")
    .optional()
    .isArray().withMessage("Challenges must be an array"),

  body("lessons")
    .optional()
    .isArray().withMessage("Lessons must be an array"),

  body("mood")
    .optional()
    .isIn(["excellent", "good", "neutral", "challenging", "difficult"])
    .withMessage("Invalid mood"),

  body("productivityRating")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("Productivity rating must be between 1 and 10"),

  body("healthRating")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("Health rating must be between 1 and 10"),

  validate,
];

// ============================================
// ANALYTICS VALIDATORS
// ============================================

// Validate analytics query parameters
export const validateAnalyticsQuery = [
  query("days")
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage("Days must be between 1 and 365"),

  validate,
];

// Validate generic MongoDB ID
export const validateMongoId = [
  param("id")
    .isMongoId().withMessage("Invalid ID format"),
  validate,
];