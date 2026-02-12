import { Error } from "mongoose";

// Custom error class for handling API errors
// Extends the built-in Error object
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);          // Set error message
    this.statusCode = statusCode; // Attach HTTP status code

    // Capture stack trace (helps in debugging)
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorResponse;
