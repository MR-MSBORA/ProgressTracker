// import logger from '../config/logger.js';

// /* =================================
//    Custom Error Class
// ================================= */
// export class AppError extends Error {
//   constructor(message, statusCode) {
//     super(message);

//     this.statusCode = statusCode;
//     this.isOperational = true;

//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// /* =================================
//    Not Found Middleware (404)
// ================================= */
// export const notFound = (req, res, next) => {
//   const error = new AppError(`Route not found - ${req.originalUrl}`, 404);
//   next(error);
// };

// /* =================================
//    Global Error Handler
// ================================= */
// export const errorHandler = (err, req, res, next) => {

//   let error = { ...err };
//   error.message = err.message;
//   error.statusCode = err.statusCode || 500;

//   /* =================================
//      PRINT FULL ERROR IN TERMINAL
//   ================================= */

//   console.log("\n========================================");
//   console.log("🔥 GLOBAL ERROR HANDLER");
//   console.log("Route   :", req.method, req.originalUrl);
//   console.log("IP      :", req.ip);
//   console.log("Message :", err.message);
//   console.log("Type    :", err.name);
//   console.log("Stack ↓ ");
//   console.log(err.stack);
//   console.log("========================================\n");

//   /* =================================
//      Logger (File / Winston / etc)
//   ================================= */

//   logger.error({
//     message: err.message,
//     stack: err.stack,
//     url: req.originalUrl,
//     method: req.method,
//     ip: req.ip,
//     statusCode: error.statusCode
//   });

//   /* =================================
//      Handle Known Errors
//   ================================= */

//   // Invalid Mongo ObjectId
//   if (err.name === 'CastError') {
//     error = new AppError('Resource not found', 404);
//   }

//   // Duplicate key error
//   if (err.code === 11000) {
//     const field = Object.keys(err.keyValue)[0];
//     const message =
//       `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;

//     error = new AppError(message, 400);
//   }

//   // Validation error
//   if (err.name === 'ValidationError') {
//     const message = Object.values(err.errors)
//       .map(val => val.message)
//       .join(', ');

//     error = new AppError(message, 400);
//   }

//   // JWT invalid
//   if (err.name === 'JsonWebTokenError') {
//     error = new AppError('Invalid token. Please log in again.', 401);
//   }

//   // JWT expired
//   if (err.name === 'TokenExpiredError') {
//     error = new AppError('Token expired. Please log in again.', 401);
//   }

//   /* =================================
//      Send Error Response
//   ================================= */

//   res.status(error.statusCode).json({
//     success: false,
//     message: error.message || 'Server Error',

//     ...(process.env.NODE_ENV === 'development' && {
//       stack: err.stack,
//       error: err
//     })
//   });

// };

// /* =================================
//    Async Wrapper (Avoid Try-Catch)
// ================================= */

// export const asyncHandler = (fn) => (req, res, next) => {
//   Promise
//     .resolve(fn(req, res, next))
//     .catch(next);
// };


import logger from '../config/logger.js';

/* =================================
   Custom Error Class
================================= */
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/* =================================
   Not Found Middleware (404)
================================= */
export const notFound = (req, res, next) => {
  const error = new AppError(`Route not found - ${req.originalUrl}`, 404);
  next(error);
};

/* =================================
   Global Error Handler
================================= */
export const errorHandler = (err, req, res, next) => {

  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;

  /* =================================
     PRINT FULL ERROR IN TERMINAL
  ================================= */

  console.log("\n========================================");
  console.log("🔥 GLOBAL ERROR HANDLER");
  console.log("Route   :", req.method, req.originalUrl);
  console.log("IP      :", req.ip);
  console.log("Name    :", err.name);
  console.log("Message :", err.message);
  console.log("Type    :", typeof err);
  console.log("Stack ↓ ");
  console.log(err.stack);
  console.log("========================================\n");

  /* =================================
     Logger (Winston / File etc)
  ================================= */

  logger.error({
    name: err.name,
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    statusCode: error.statusCode
  });

  /* =================================
     Handle Known Errors
  ================================= */

  // Invalid Mongo ObjectId
  if (err.name === 'CastError') {
    error = new AppError('Resource not found', 404);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message =
      `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;

    error = new AppError(message, 400);
  }

  // Validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ');

    error = new AppError(message, 400);
  }

  // JWT invalid
  if (err.name === 'JsonWebTokenError') {
    error = new AppError('Invalid token. Please log in again.', 401);
  }

  // JWT expired
  if (err.name === 'TokenExpiredError') {
    error = new AppError('Token expired. Please log in again.', 401);
  }

  /* =================================
     Send Error Response
  ================================= */

  res.status(error.statusCode).json({
    success: false,

    // Main message
    message: error.message || "Server Error",

    // Show detailed error only in development
    ...(process.env.NODE_ENV === 'development' && {
      errorName: err.name,
      errorMessage: err.message,
      stack: err.stack,
      fullError: err
    })
  });

};

/* =================================
   Async Wrapper (Avoid Try-Catch)
================================= */

export const asyncHandler = (fn) => (req, res, next) => {
  Promise
    .resolve(fn(req, res, next))
    .catch(next);
};