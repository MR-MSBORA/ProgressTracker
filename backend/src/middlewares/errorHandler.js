// Import logger (ES6)
import logger from '../config/logger.js';

/* =================================
   Custom Error Class
================================= */
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;   // HTTP status code
    this.isOperational = true;      // Known/handled error

    Error.captureStackTrace(this, this.constructor);
  }
}

/* =================================
   Not Found Middleware (404)
================================= */
export const notFound = (req, res, next) => {
  const error = new AppError(`Route not found - ${req.originalUrl}`, 404);
  next(error); // Pass to global error handler
};

/* =================================
   Global Error Handler
================================= */
export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;

  // Log error details
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    statusCode: error.statusCode
  });

  /* ===== Handle Specific Errors ===== */

  // Mongoose invalid ObjectId
  if (err.name === 'CastError') {
    error = new AppError('Resource not found', 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    error = new AppError(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ');
    error = new AppError(message, 400);
  }

  // JWT invalid token
  if (err.name === 'JsonWebTokenError') {
    error = new AppError('Invalid token. Please log in again.', 401);
  }

  // JWT expired token
  if (err.name === 'TokenExpiredError') {
    error = new AppError('Token expired. Please log in again.', 401);
  }

  // Send error response
  res.status(error.statusCode).json({
    success: false,
    message: error.message || 'Server Error',

    // Show stack only in development
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      error: err
    })
  });
};

/* =================================
   Async Handler Wrapper
================================= */
// Avoid try-catch in controllers
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};