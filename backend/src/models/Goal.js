import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a goal title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },

    status: {
      type: String,
      enum: ["active", "completed", "failed", "paused"],
      default: "active",
    },

    target: {
      type: Number,
      required: [true, "Please add a target number"],
      min: [1, "Target must be at least 1"],
    },

    current: {
      type: Number,
      default: 0,
      min: 0,
    },

    period: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      default: "monthly",
    },

    startDate: { type: Date, default: Date.now },

    endDate: { type: Date, required: [true, "Please add an end date"] },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


// Calculate progress percentage automatically
goalSchema.virtual("progress").get(function () {
  if (this.target === 0) return 0;
  return Math.round((this.current / this.target) * 100);
});

// Include virtuals in JSON output
goalSchema.set("toJSON", { virtuals: true });
goalSchema.set("toObject", { virtuals: true });

// Check if goal is completed
goalSchema.methods.checkCompletion = function () {
  if (this.current >= this.target) {
    this.status = "completed";
  }
  return this.status === "completed";
};

// Update progress
goalSchema.methods.updateProgress = function (increment = 1) {
  this.current += increment;
  this.checkCompletion();
};

export default mongoose.model("Goal", goalSchema);