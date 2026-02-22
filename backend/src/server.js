// // ================= IMPORTS =================

// // Express framework to create server and APIs
// import express from "express";

// // Loads environment variables from .env file
// import dotenv from "dotenv";

// import taskRoutes from "./routes/taskRoutes.js"

// // Load environment variables
// dotenv.config();

// // Enables Cross-Origin Resource Sharing (frontend ↔ backend)
// import cors from "cors";

// // Database connection function
// import connectDB from "./config/db.js";

// // Auth routes (register, verify email, etc.)
// import authRoutes from "./routes/authRoutes.js";
// import goalRoutes from "./routes/goalRoutes.js"
// import skillRoutes from "./routes/skillRoutes.js"
// import reflectionRoutes from "./routes/reflectionRoutes.js";
// import analyticRoutes from "./routes/analyticRoutes.js"

// // ================= CONFIGURATION =================



// // Connect to MongoDB database
// connectDB();


// // ================= APP INITIALIZATION =================

// // Create express app instance
// const app = express();


// // ================= GLOBAL MIDDLEWARE =================

// // Parse incoming JSON request bodies
// // Allows access to req.body
// app.use(express.json());

// // Enable CORS for frontend communication
// app.use(cors());

// // ================= HEALTH CHECK =================

// /**
//  * Health Check Route
//  * ------------------
//  * Used to confirm server is running properly
//  * Helpful for deployment monitoring
//  *
//  * URL: /api/v1/health
//  * Method: GET
//  */
// app.get('/api/health', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Server is running',
//     timestamp: new Date().toISOString()
//   });
// });


// // ================= ROUTES =================

// /**
//  * AUTH ROUTES
//  * -----------
//  * All authentication-related routes are handled here
//  *
//  * Examples:
//  * POST   /api/v1/auth/register
//  * GET    /api/v1/auth/verify-email/:token
//  * POST   /api/v1/auth/resend-verification
//  */
// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);
// app.use('/api/goals', goalRoutes);
// app.use('/api/skills', skillRoutes);
// app.use("/api/reflections", reflectionRoutes);
// app.use("/api/analytics", analyticRoutes);

// // ================= TEST ROUTE =================

// /**
//  * Root route
//  * Simple test to check API is responding
//  */
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });


// // ================= SERVER START =================

// // Get port from env or default to 5000
// const PORT = process.env.PORT || 5000;

// // Start server
// app.listen(PORT, () =>
//   console.log(`🚀 Server running on port ${PORT}`)
// );

// console.log("JWT_SECRET is:", process.env.JWT_SECRET);


// ================= IMPORTS =================

// Core framework
import express from "express";

// Load environment variables from .env file
import dotenv from "dotenv";

// Enable CORS (allow frontend to access backend)
import cors from "cors";

// Compress response size (improves performance)
import compression from "compression";

// HTTP request logger
import morgan from "morgan";

// Connect to MongoDB
import connectDB from "./config/db.js";

// Authentication routes
import authRoutes from "./routes/authRoutes.js";

// Custom logger (winston or similar)
import logger from "./config/logger.js";

// Security middlewares
import {
  securityHeaders,            // Adds secure HTTP headers
  corsOptions,                // Custom CORS configuration
  requestSizeLimiter,         // Limit request body size
  preventParameterPollution   // Prevent duplicate query params
} from "./middlewares/security.js";

// Rate limiter middleware (protect from spam / brute force)
import { generalLimiter } from "./middlewares/rateLimiter.js";

// Error handling middlewares
import {
  notFound,       // Handle 404 routes
  errorHandler    // Handle all server errors
} from "./middlewares/errorHandler.js";

// Input sanitization (clean malicious input)
import { sanitizeInput } from "./middlewares/validator.js";


// ================= CONFIG =================

// Load .env variables
dotenv.config();

// Connect database
connectDB();

// Initialize express app
const app = express();

// Trust proxy (needed if using reverse proxy like Nginx, Render etc.)
app.set("trust proxy", 1);


// ================= SECURITY MIDDLEWARE =================

// Add security headers (like Helmet)
app.use(securityHeaders);

// Enable CORS with custom options
app.use(cors(corsOptions));

// Compress all responses
app.use(compression());

// Parse JSON body with size limit
app.use(express.json(requestSizeLimiter.json));

// Parse URL-encoded data with size limit
app.use(express.urlencoded(requestSizeLimiter.urlencoded));

// Logging (different for dev and production)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Simple console logs
} else {
  app.use(morgan("combined", { stream: logger.stream })); // Production logging
}

// Sanitize all incoming data
app.use(sanitizeInput);

// Prevent query parameter pollution attacks
app.use(preventParameterPollution);

// Apply rate limiter only to API routes
app.use("/api/", generalLimiter);


// ================= ROUTES =================

// Auth related routes
app.use("/api/auth", authRoutes);


// ================= HEALTH ROUTES =================

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Basic API info route
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth"
    }
  });
});


// ================= ERROR HANDLING =================

// Handle undefined routes (404)
app.use(notFound);

// Global error handler (must be last middleware)
app.use(errorHandler);


// ================= SERVER START =================

// Define port (from .env or default 5000)
const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(PORT, () => {
  logger.info(
    `🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
  );
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// ================= PROCESS HANDLERS =================

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Promise Rejection:", err);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  server.close(() => process.exit(1));
});

// Export app (useful for testing)
export default app;