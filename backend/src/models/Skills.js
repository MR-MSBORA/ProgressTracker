import mongoose from "mongoose";

// Practice log sub-schema
const practiceLogSchema = new mongoose.Schema({
  // Practice date
  date: {
    type: Date,
    default: Date.now,
  },
  // Duration in minutes
  duration: {
    type: Number,
    required: [true, "Please add duration in minutes"],
    min: [1, "Duration must be at least 1 minute"],
  },
  // Notes about the practice session
  notes: {
    type: String,
    maxlength: [500, "Notes cannot be more than 500 characters"],
  },
});

const skillSchema = new mongoose.Schema(
  {
    // Skill name
    name: {
      type: String,
      required: [true, "Please add a skill name"],
      trim: true,
      maxlength: [50, "Skill name cannot be more than 50 characters"],
    },

    // Description
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot be more than 200 characters"],
    },

    // Category
    category: {
      type: String,
      enum: [
        "programming",
        "language",
        "music",
        "art",
        "sport",
        "business",
        "other",
      ],
      default: "other",
    },

    // Proficiency level
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "expert"],
      default: "beginner",
    },

    // Target hours to reach next level
    targetHours: {
      type: Number,
      default: 100,
      min: [1, "Target hours must be at least 1"],
    },

    // Current total hours practiced
    totalHours: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Practice logs array
    practiceLogs: [practiceLogSchema],

    // User who owns this skill
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    // Whether skill is currently being practiced
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual: Calculate progress percentage toward target
skillSchema.virtual("progress").get(function () {
  if (this.targetHours === 0) return 0;
  return Math.min(Math.round((this.totalHours / this.targetHours) * 100), 100);
});

// Virtual: Get total practice sessions
skillSchema.virtual("totalSessions").get(function () {
  return this.practiceLogs.length;
});

// Include virtuals in JSON
skillSchema.set("toJSON", { virtuals: true });
skillSchema.set("toObject", { virtuals: true });

// Method: Add practice session
skillSchema.methods.logPractice = function (duration, notes = "") {
  // Add to practice logs
  this.practiceLogs.push({
    duration,
    notes,
  });

  // Update total hours (convert minutes to hours)
  this.totalHours += duration / 60;

  // Check if level should be upgraded
  this.checkLevelUp();
};

// Method: Check and upgrade level if needed
skillSchema.methods.checkLevelUp = function () {
  if (this.totalHours >= this.targetHours) {
    const levels = ["beginner", "intermediate", "advanced", "expert"];
    const currentIndex = levels.indexOf(this.level);

    if (currentIndex < levels.length - 1) {
      this.level = levels[currentIndex + 1];
      // Increase target for next level
      this.targetHours += 100;
    }
  }
};

// Method: Get recent practice logs
skillSchema.methods.getRecentLogs = function (limit = 5) {
  return this.practiceLogs
    .sort((a, b) => b.date - a.date)
    .slice(0, limit);
};

export default mongoose.model("Skill", skillSchema);