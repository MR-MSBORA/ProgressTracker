// ================= IMPORT LOGGER =================
// Import custom logger (example: winston logger)
import logger from "../config/logger.js";


// ================= REQUEST TIMER MIDDLEWARE =================
/*
  This middleware measures:
  - How long each request takes
  - Logs method, URL, status, duration
  - Detects slow requests (> 1 second)
*/
export const requestTimer = (req, res, next) => {
  
  // Record start time when request comes in
  const start = Date.now();

  // When response is finished (sent to client)
  res.on("finish", () => {

    // Calculate total request duration
    const duration = Date.now() - start;

    // Log basic request details
    logger.info({
      method: req.method,            // GET, POST, PUT, DELETE
      url: req.originalUrl,          // Full request URL
      status: res.statusCode,        // Response status code (200, 404, etc.)
      duration: `${duration}ms`,     // Time taken
      ip: req.ip,                    // Client IP address
      userAgent: req.get("user-agent") // Browser / client info
    });

    // If request took more than 1 second → mark as slow
    if (duration > 1000) {
      logger.warn(
        `Slow request detected: ${req.method} ${req.originalUrl} - ${duration}ms`
      );
    }
  });

  // Move to next middleware or route
  next();
};


// ================= MEMORY MONITOR FUNCTION =================
/*
  This function checks:
  - Total memory used by Node.js process
  - Heap memory usage
  - External memory usage

  Useful for detecting:
  - Memory leaks
  - High RAM usage
*/
export const monitorMemory = () => {

  // Get memory usage details from Node.js
  const used = process.memoryUsage();

  // Convert bytes → MB and round to 2 decimal places
  logger.info({
    message: "Memory Usage",
    rss: `${Math.round((used.rss / 1024 / 1024) * 100) / 100} MB`,        // Total memory allocated
    heapTotal: `${Math.round((used.heapTotal / 1024 / 1024) * 100) / 100} MB`, // Total heap size
    heapUsed: `${Math.round((used.heapUsed / 1024 / 1024) * 100) / 100} MB`,   // Used heap memory
    external: `${Math.round((used.external / 1024 / 1024) * 100) / 100} MB`    // External memory (buffers, etc.)
  });
};


// ================= AUTO MEMORY MONITOR =================
/*
  Automatically runs monitorMemory()
  every 5 minutes (5 × 60 × 1000 milliseconds)
*/
setInterval(monitorMemory, 5 * 60 * 1000);