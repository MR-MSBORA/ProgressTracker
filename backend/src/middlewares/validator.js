// Import express-validator (ES6)
import { body, param, validationResult } from 'express-validator';

/* =================================
   Validation Error Handler
================================= */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req); // Get validation errors

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,   // Field name
        message: err.msg,  // Error message
        value: err.value   // Submitted value
      }))
    });
  }

  next(); // Continue if no errors
};

/* =================================
   Registration Validation
================================= */
export const validateRegistration = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/).withMessage('Name can only contain letters, spaces, hyphens, and apostrophes'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail()
    .toLowerCase(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),

  handleValidationErrors
];

/* =================================
   Login Validation
================================= */
export const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail()
    .toLowerCase(),

  body('password')
    .notEmpty().withMessage('Password is required'),

  handleValidationErrors
];

/* =================================
   Email Validation
================================= */
export const validateEmail = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail()
    .toLowerCase(),

  handleValidationErrors
];

/* =================================
   Token Validation
================================= */
export const validateToken = [
  param('token')
    .notEmpty().withMessage('Token is required')
    .isLength({ min: 64, max: 64 }).withMessage('Invalid token format')
    .matches(/^[a-f0-9]{64}$/).withMessage('Token must be valid hexadecimal'),

  handleValidationErrors
];

/* =================================
   Password Reset Validation
================================= */
export const validatePasswordReset = [
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),

  body('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),

  param('token')
    .notEmpty().withMessage('Token is required'),

  handleValidationErrors
];

/* =================================
   Sanitize Input (Basic XSS Protection)
================================= */
export const sanitizeInput = (req, res, next) => {

  const sanitize = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].replace(/<[^>]*>/g, ''); // Remove HTML tags
        obj[key] = obj[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''); // Remove script tags
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitize(obj[key]); // Recursively sanitize
      }
    }
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);

  next();
};