// export const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);

//     const allowedOrigins = [
//       "http://localhost:3000",
//       "http://localhost:5173",
//       "http://127.0.0.1:3000",
//       process.env.CLIENT_URL, // your Vercel URL
//       "progress-tracker-98bm5pq7o-mr-msboras-projects.vercel.app" // 👈 MUST ADD
//     ].filter(Boolean);

//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.log("❌ Blocked by CORS:", origin);
//       callback(new Error("Not allowed by CORS"));
//     }
//   },

//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: [
//     "Content-Type",
//     "Authorization",
//     "X-Requested-With",
//     "Accept"
//   ],
//   optionsSuccessStatus: 200
// };
export const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://127.0.0.1:3000",
      process.env.CLIENT_URL,
      "https://progress-tracker-cnbp3wwcv-mr-msboras-projects.vercel.app",
      "https://progress-tracker-snowy-nu.vercel.app"
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(null, false); // ✅ important
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