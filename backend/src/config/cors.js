export const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://127.0.0.1:3000",
      process.env.CLIENT_URL,
      // "https://progress-tracker-cnbp3wwcv-mr-msboras-projects.vercel.app",
      "https://vercel.com/mr-msboras-projects/progress-tracker/D7jGNsTzcoDmEgtVsuHW764QY4Pr"
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