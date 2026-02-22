import morgan from "morgan";
import fs from "fs";
import path from "path";

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(logsDir, "access.log"),
  { flags: "a" }
);

// Custom token for response time in milliseconds
morgan.token("response-time-ms", (req, res) => {
  if (!req._startAt || !res._startAt) {
    return "";
  }
  const ms =
    (res._startAt[0] - req._startAt[0]) * 1000 +
    (res._startAt[1] - req._startAt[1]) / 1000000;
  return ms.toFixed(2);
});

// Custom format
const logFormat =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time-ms ms';

// Development logger (console)
export const devLogger = morgan("dev");

// Production logger (file)
export const prodLogger = morgan(logFormat, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400, // Only log errors in production
});

// Combined logger for all requests
export const combinedLogger = morgan(logFormat, {
  stream: accessLogStream,
});

// Custom request logger
export const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  // Log when response finishes
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const log = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.get("user-agent"),
    };

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log(JSON.stringify(log, null, 2));
    }
  });

  next();
};