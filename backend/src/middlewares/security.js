import helmet from "helmet";
import hpp from "hpp";

// Helmet
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

// Remove mongoSanitize completely
// Remove xss-clean (outdated)

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
  ],
});

// Custom security headers
export const securityHeaders = (req, res, next) => {
  res.removeHeader("X-Powered-By");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
};