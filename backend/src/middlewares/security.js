// import helmet from "helmet";
// import mongoSanitize from "express-mongo-sanitize";
// import xss from "xss-clean";
// import hpp from "hpp";

// // Helmet helps secure Express apps by setting various HTTP headers
// export const helmetConfig = helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       styleSrc: ["'self'", "'unsafe-inline'"],
//       scriptSrc: ["'self'"],
//       imgSrc: ["'self'", "data:", "https:"],
//     },
//   },
// });

// // Sanitize data to prevent NoSQL injection
// export const sanitizeData = mongoSanitize();

// // Prevent XSS attacks
// export const preventXSS = xss();

// // Prevent HTTP Parameter Pollution
// export const preventHPP = hpp({
//   whitelist: [
//     "status",
//     "priority",
//     "category",
//     "level",
//     "period",
//     "mood",
//     "days",
//   ], // Allow these query parameters to be duplicated
// });

// // Custom security headers
// export const securityHeaders = (req, res, next) => {
//   // Remove X-Powered-By header
//   res.removeHeader("X-Powered-By");

//   // Add custom security headers
//   res.setHeader("X-Content-Type-Options", "nosniff");
//   res.setHeader("X-Frame-Options", "DENY");
//   res.setHeader("X-XSS-Protection", "1; mode=block");
//   res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

//   next();
// };

import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";

// Helmet helps secure Express apps by setting various HTTP headers
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
});

// Sanitize data to prevent NoSQL injection
export const sanitizeData = mongoSanitize();

// Prevent XSS attacks
export const preventXSS = xss();

// Prevent HTTP Parameter Pollution
export const preventHPP = hpp({
  whitelist: [
    "status",
    "priority",
    "category",
    "level",
    "period",
    "mood",
    "days",
  ], // Allow these query parameters to be duplicated
});

// Custom security headers
export const securityHeaders = (req, res, next) => {
  // Remove X-Powered-By header
  res.removeHeader("X-Powered-By");

  // Add custom security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  next();
};