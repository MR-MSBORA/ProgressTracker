// import rateLimit from "express-rate-limit";

// // General API rate limiter
// export const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
//   message: {
//     success: false,
//     error: "Too many requests from this IP, please try again later.",
//   },
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });

// // Stricter limiter for authentication endpoints
// export const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // Limit each IP to 5 requests per windowMs
//   skipSuccessfulRequests: true, // Don't count successful requests
//   message: {
//     success: false,
//     error: "Too many authentication attempts, please try again after 15 minutes.",
//   },
// });

// // Limiter for creating resources
// export const createLimiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 10, // Limit each IP to 10 create requests per minute
//   message: {
//     success: false,
//     error: "Too many create requests, please slow down.",
//   },
// });

// // Limiter for file uploads (if you add this feature later)
// export const uploadLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour
//   max: 10, // Limit each IP to 10 uploads per hour
//   message: {
//     success: false,
//     error: "Too many uploads, please try again later.",
//   },
// });


import rateLimit from "express-rate-limit";

const isDev = process.env.NODE_ENV === "development";

// ================= GENERAL API LIMITER =================

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDev ? 1000 : 100, // Higher limit in development
  message: {
    success: false,
    error: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ================= AUTH LIMITER =================

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDev ? 50 : 5, // Allow more attempts during development
  skipSuccessfulRequests: true,
  message: {
    success: false,
    error: "Too many authentication attempts, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ================= CREATE RESOURCE LIMITER =================

export const createLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: isDev ? 500 : 10, // Development friendly
  message: {
    success: false,
    error: "Too many create requests, please slow down.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ================= FILE UPLOAD LIMITER =================

export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: isDev ? 100 : 10,
  message: {
    success: false,
    error: "Too many uploads, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});