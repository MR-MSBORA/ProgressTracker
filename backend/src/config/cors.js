// export const corsOptions = {
//   origin: function (origin, callback) {
//     // const allowedOrigins = [
//     //   "http://localhost:3000",
//     //   "http://localhost:5173",
//     //   "http://127.0.0.1:3000",
//     //   process.env.CLIENT_URL,
//     //   // "https://progress-tracker-cnbp3wwcv-mr-msboras-projects.vercel.app",
//     //   "https://progress-tracker-dgxhvnq9p-mr-msboras-projects.vercel.app"
//     // ].filter(Boolean);
//     const allowedOrigins = [
//       "http://localhost:3000",
//       "http://localhost:5173",
//       "http://127.0.0.1:3000",
//       process.env.CLIENT_URL,
//       "https://progress-tracker-snowy-nu.vercel.app", // ✅ ADD THIS
//     ].filter(Boolean);

//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.log("❌ Blocked by CORS:", origin);
//       callback(null, false); // ✅ important
//     }
//   },

//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: [
//     "Content-Type",
//     "Authorization",
//     "X-Requested-With",
//     "Accept",
//   ],
//   optionsSuccessStatus: 200,
// };


// ================= CORS CONFIGURATION =================

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  process.env.CLIENT_URL, // from .env
  "https://progress-tracker-snowy-nu.vercel.app" // ✅ your current frontend
].filter(Boolean);

export const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, mobile apps, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS")); // ✅ important fix
    }
  },

  credentials: true,

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept"
  ],

  optionsSuccessStatus: 200
};