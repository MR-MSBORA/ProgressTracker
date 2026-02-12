import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Protect routes
 * ----------------
 * Checks JWT token and attaches logged-in user to req.user
 */
export const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // Verify token using secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user from token id (hide password)
      req.user = await User.findById(decoded.id).select('-password');

      // If user no longer exists
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found - token invalid',
        });
      }

      // Token valid → move to next middleware
      return next();

    } catch (error) {
      console.error('Auth error:', error.message);

      return res.status(401).json({
        success: false,
        message: 'Not authorized - token failed',
      });
    }
  }

  // No token at all
  return res.status(401).json({
    success: false,
    message: 'Not authorized - no token provided',
  });
};

/**
 * Require email verification
 * --------------------------
 * Blocks access if email is not verified
 */
export const requireEmailVerification = (req, res, next) => {
  if (!req.user.isEmailVerified) {
    return res.status(403).json({
      success: false,
      message: 'Please verify your email to access this feature',
    });
  }

  next();
};
