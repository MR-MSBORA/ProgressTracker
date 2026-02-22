// Import express-rate-limit (ES6)
import rateLimit from 'express-rate-limit';

/* ===============================
   General API Rate Limiter
================================= */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP per 15 min
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true, // Use RateLimit-* headers
  legacyHeaders: false,  // Disable X-RateLimit-* headers
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests from this IP, please try again after 15 minutes.',
      retryAfter: req.rateLimit.resetTime // When limit resets
    });
  }
});

/* ===============================
   Auth Limiter (Login/Register)
================================= */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Only 5 attempts
  skipSuccessfulRequests: true, // Count only failed attempts
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many login attempts. Please try again after 15 minutes.',
      retryAfter: req.rateLimit.resetTime
    });
  }
});

/* ===============================
   Email Limiter (Anti-Spam)
================================= */
export const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 emails per hour
  message: {
    success: false,
    message: 'Too many email requests, please try again later.'
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many email requests. Please try again after 1 hour.',
      retryAfter: req.rateLimit.resetTime
    });
  }
});

/* ===============================
   Registration Limiter
================================= */
export const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 registrations per hour
  message: {
    success: false,
    message: 'Too many accounts created from this IP, please try again later.'
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many registration attempts. Please try again after 1 hour.',
      retryAfter: req.rateLimit.resetTime
    });
  }
});

/* ===============================
   Password Reset Limiter
================================= */
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 reset attempts per hour
  message: {
    success: false,
    message: 'Too many password reset attempts, please try again later.'
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many password reset requests. Please try again after 1 hour.',
      retryAfter: req.rateLimit.resetTime
    });
  }
});

/* ===============================
   Custom Rate Limiter Creator
================================= */
export const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message
    },
    standardHeaders: true,
    legacyHeaders: false
  });
};