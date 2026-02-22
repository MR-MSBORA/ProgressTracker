// Import required modules (ES6 syntax)
import winston from 'winston';      // Logging library
import path from 'path';            // Handle file paths
import fs from 'fs';                // File system module
import { fileURLToPath } from 'url';

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add time
  winston.format.errors({ stack: true }), // Show error stack
  winston.format.splat(), // Support string formatting
  winston.format.json() // Output in JSON
);

// Create logs folder if not exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Create logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info', // Default level
  format: logFormat,
  defaultMeta: { service: 'backend-api' },
  transports: [
    // Error logs file
    new winston.transports.File({ 
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5242880,
      maxFiles: 5,
    }),
    // All logs file
    new winston.transports.File({ 
      filename: path.join(logsDir, 'combined.log'),
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});

// Console logs in development mode
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// Stream for Morgan
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

// Export logger (ES6)
export default logger;