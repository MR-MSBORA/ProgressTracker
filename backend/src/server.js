// ================= IMPORTS =================

// Core packages
import express from "express";      // Express framework
import dotenv from "dotenv";        // Load environment variables
import cors from "cors";            // Enable CORS

// Database connection
import connectDB from "./config/db.js";

// Custom CORS configuration
import { corsOptions } from "./config/cors.js";

// ================= ROUTES =================
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import reflectionRoutes from "./routes/reflectionRoutes.js";
import analyticRoutes from "./routes/analyticRoutes.js";

// ================= MIDDLEWARE =================
import {
  helmetConfig,     // Helmet security
  sanitizeData,     // Prevent NoSQL injection
  preventXSS,       // Prevent XSS attacks
  preventHPP,       // Prevent HTTP parameter pollution
  securityHeaders,  // Custom security headers
} from "./middlewares/security.js";

import { apiLimiter } from "./middlewares/rateLimiter.js"; // Rate limiter

import {
  devLogger,        // Development logger
  prodLogger,       // Production logger
  requestLogger,    // Custom request logger
} from "./middlewares/logger.js";

import { errorHandler, notFound } from "./middlewares/errorHandler.js"; // Error handlers


// ================= CONFIGURATION =================

dotenv.config();    // Load .env variables
connectDB();        // Connect to MongoDB

const app = express();


// ================= SECURITY (APPLIED FIRST) =================

// Apply layered security middleware
app.use(helmetConfig);
app.use(securityHeaders);
app.use(sanitizeData);
app.use(preventXSS);
app.use(preventHPP);


// ================= CORS =================

// Allow cross-origin requests with custom rules
app.use(cors(corsOptions));


// ================= BODY PARSING =================

// Parse incoming JSON and form data
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


// ================= LOGGING =================

// Different logging for dev and production
if (process.env.NODE_ENV === "development") {
  app.use(devLogger);
  app.use(requestLogger);
} else {
  app.use(prodLogger);
}


// ================= RATE LIMITING =================

// Protect all API routes from abuse
app.use("/api/", apiLimiter);


// ================= ROUTES =================

// Main application routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/reflections", reflectionRoutes);
app.use("/api/analytic", analyticRoutes);


// ================= HEALTH CHECK =================

// Used to verify server status
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});


// ================= ROOT ENDPOINT =================

// Basic API information
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Productivity Tracker API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      tasks: "/api/tasks",
      goals: "/api/goals",
      skills: "/api/skills",
      reflections: "/api/reflections",
      analytics: "/api/analytics",
    },
  });
});


// ================= ERROR HANDLING =================

// Handle undefined routes
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);


// ================= SERVER START =================

const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(PORT, () => {
  console.log(`
  ================================================
  🚀 Server running in ${process.env.NODE_ENV} mode
  📡 Port: ${PORT}
  🗄️  Database: Connected
  ⏰ Started: ${new Date().toLocaleString()}
  ================================================
  `);
});


// ================= PROCESS ERROR HANDLING =================

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`❌ Uncaught Exception: ${err.message}`);
  process.exit(1);
});

export default app;