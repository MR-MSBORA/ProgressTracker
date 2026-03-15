// // import rateLimit from "express-rate-limit";

// // // General API rate limiter
// // export const apiLimiter = rateLimit({
// //   windowMs: 15 * 60 * 1000, // 15 minutes
// //   max: 100, // Limit each IP to 100 requests per windowMs
// //   message: {
// //     success: false,
// //     error: "Too many requests from this IP, please try again later.",
// //   },
// //   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
// //   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// // });

// // // Stricter limiter for authentication endpoints
// // export const authLimiter = rateLimit({
// //   windowMs: 15 * 60 * 1000, // 15 minutes
// //   max: 5, // Limit each IP to 5 requests per windowMs
// //   skipSuccessfulRequests: true, // Don't count successful requests
// //   message: {
// //     success: false,
// //     error: "Too many authentication attempts, please try again after 15 minutes.",
// //   },
// // });

// // // Limiter for creating resources
// // export const createLimiter = rateLimit({
// //   windowMs: 60 * 1000, // 1 minute
// //   max: 10, // Limit each IP to 10 create requests per minute
// //   message: {
// //     success: false,
// //     error: "Too many create requests, please slow down.",
// //   },
// // });

// // // Limiter for file uploads (if you add this feature later)
// // export const uploadLimiter = rateLimit({
// //   windowMs: 60 * 60 * 1000, // 1 hour
// //   max: 10, // Limit each IP to 10 uploads per hour
// //   message: {
// //     success: false,
// //     error: "Too many uploads, please try again later.",
// //   },
// // });


// import rateLimit from "express-rate-limit";

// const isDev = process.env.NODE_ENV === "development";

// // ================= GENERAL API LIMITER =================

// export const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: isDev ? 1000 : 100, // Higher limit in development
//   message: {
//     success: false,
//     error: "Too many requests from this IP, please try again later.",
//   },
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// // ================= AUTH LIMITER =================

// export const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: isDev ? 50 : 5, // Allow more attempts during development
//   skipSuccessfulRequests: true,
//   message: {
//     success: false,
//     error: "Too many authentication attempts, please try again after 15 minutes.",
//   },
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// // ================= CREATE RESOURCE LIMITER =================

// export const createLimiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: isDev ? 500 : 10, // Development friendly
//   message: {
//     success: false,
//     error: "Too many create requests, please slow down.",
//   },
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// // ================= FILE UPLOAD LIMITER =================

// export const uploadLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour
//   max: isDev ? 100 : 10,
//   message: {
//     success: false,
//     error: "Too many uploads, please try again later.",
//   },
//   standardHeaders: true,
//   legacyHeaders: false,
// });





import rateLimit from "express-rate-limit";

// Check if we're in development mode
const isDev = process.env.NODE_ENV === "development";

// ================= GENERAL API LIMITER =================
// Applied to general API routes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDev ? 10000 : 100, // 10,000 in dev, 100 in production
  message: {
    success: false,
    error: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable old X-RateLimit headers
  skip: () => isDev, // Skip rate limiting entirely in development
});

// ================= AUTH LIMITER =================
// Applied to authentication endpoints (login, register, etc.)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDev ? 10000 : 5, // 10,000 in dev, 5 in production
  skipSuccessfulRequests: true, // Don't count successful requests
  message: {
    success: false,
    error: "Too many authentication attempts, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isDev, // Skip entirely in development
});

// ================= CREATE RESOURCE LIMITER =================
// Applied to POST endpoints that create new resources
export const createLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: isDev ? 10000 : 10, // 10,000 in dev, 10 in production
  message: {
    success: false,
    error: "Too many create requests, please slow down.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isDev, // Skip entirely in development
});

// ================= FILE UPLOAD LIMITER =================
// Applied to file upload endpoints (if implemented)
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: isDev ? 10000 : 10, // 10,000 in dev, 10 in production
  message: {
    success: false,
    error: "Too many uploads, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isDev, // Skip entirely in development
});

// ================= EXPORT ALL =================
export default {
  apiLimiter,
  authLimiter,
  createLimiter,
  uploadLimiter,
};