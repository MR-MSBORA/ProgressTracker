import express from 'express';

import {
  register,
  verifyEmail,
  resendVerificationEmail,
  login,
  forgotPassword,
  resetPassword,
  getMe,
} from '../controllers/authControllers.js';

import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ========== PUBLIC ROUTES ==========
router.post('/register', register);
router.get('/verify-email/:token', verifyEmail);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

// ========== PRIVATE ROUTES ==========
router.get('/me', protect, getMe);
router.post('/resend-verification', protect, resendVerificationEmail);

export default router;
