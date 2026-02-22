// Import helmet (ES6)
import helmet from 'helmet';

/* =================================
   Security Headers (Helmet Config)
================================= */
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // Allow only same origin
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  dnsPrefetchControl: true,
  frameguard: { action: 'deny' }, // Prevent clickjacking
  hidePoweredBy: true, // Hide X-Powered-By header
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true,
});

/* =================================
   CORS Configuration
================================= */
export const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:5173', 'http://localhost:3000'];

    if (!origin) return callback(null, true); // Allow no-origin requests

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies/auth headers
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600 // Cache preflight for 10 minutes
};

/* =================================
   Request Size Limiter
================================= */
export const requestSizeLimiter = {
  json: { limit: '10mb' }, // Max JSON body size
  urlencoded: { extended: true, limit: '10mb' }
};

/* =================================
   IP Whitelist Middleware
================================= */
export const ipWhitelist = (whitelist) => {
  return (req, res, next) => {
    const clientIp = req.ip || req.connection.remoteAddress;

    if (whitelist.includes(clientIp)) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: 'Access denied: IP not whitelisted'
      });
    }
  };
};

/* =================================
   Prevent Parameter Pollution
================================= */
export const preventParameterPollution = (req, res, next) => {
  for (let key in req.query) {
    if (Array.isArray(req.query[key])) {
      req.query[key] = req.query[key][req.query[key].length - 1]; // Keep last value
    }
  }
  next();
};