import express from "express";

import {
  register,
  login,
  getMe,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/authControllers.js";

import { protect } from "../middlewares/authMiddleware.js";

import {
  validateRegister,
  validateLogin,
} from "../middlewares/validator.js";

import { authLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();


// ================= PUBLIC ROUTES =================

// Register new user (rate limit + input validation)
router.post("/register", authLimiter, validateRegister, register);

// Login user (rate limit + validation)
router.post("/login", authLimiter, validateLogin, login);

// Verify email using token
router.get("/verify/:token", verifyEmail);

// Send password reset link
router.post("/forgot-password", authLimiter, forgotPassword);

// Reset password using token
router.put("/reset-password/:token", authLimiter, resetPassword);


// ================= PRIVATE ROUTES =================

// Get current logged-in user details
router.get("/me", protect, getMe);

// Resend email verification (protected route)
router.post(
  "/resend-verification",
  protect,
  authLimiter,
  resendVerificationEmail
);

export default router;