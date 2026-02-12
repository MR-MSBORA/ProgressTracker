// ================= IMPORTS =================

// Express framework to create server and APIs
import express from "express";

// Loads environment variables from .env file
import dotenv from "dotenv";

import taskRoutes from "./routes/taskRoutes.js"

// Load environment variables
dotenv.config();

// Enables Cross-Origin Resource Sharing (frontend ↔ backend)
import cors from "cors";

// Database connection function
import connectDB from "./config/db.js";

// Auth routes (register, verify email, etc.)
import authRoutes from "./routes/authRoutes.js";


// ================= CONFIGURATION =================



// Connect to MongoDB database
connectDB();


// ================= APP INITIALIZATION =================

// Create express app instance
const app = express();


// ================= GLOBAL MIDDLEWARE =================

// Parse incoming JSON request bodies
// Allows access to req.body
app.use(express.json());

// Enable CORS for frontend communication
app.use(cors());

// ================= HEALTH CHECK =================

/**
 * Health Check Route
 * ------------------
 * Used to confirm server is running properly
 * Helpful for deployment monitoring
 *
 * URL: /api/v1/health
 * Method: GET
 */
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});


// ================= ROUTES =================

/**
 * AUTH ROUTES
 * -----------
 * All authentication-related routes are handled here
 *
 * Examples:
 * POST   /api/v1/auth/register
 * GET    /api/v1/auth/verify-email/:token
 * POST   /api/v1/auth/resend-verification
 */
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// ================= TEST ROUTE =================

/**
 * Root route
 * Simple test to check API is responding
 */
app.get("/", (req, res) => {
  res.send("API is running...");
});


// ================= SERVER START =================

// Get port from env or default to 5000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

console.log("JWT_SECRET is:", process.env.JWT_SECRET);
