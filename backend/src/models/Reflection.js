// import mongoose from "mongoose";

// const reflectionSchema = new mongoose.Schema(
//   {
//     weekStartDate: {
//       type: Date,
//       required: [true, "Please add week start date"],
//     },
//     weekEndDate: {
//       type: Date,
//       required: [true, "Please add week end date"],
//     },
//     weekRating: {
//       type: Number,
//       required: [true, " Please rate your week (1-10)"],
//       min: [1, "Rating must be at least"],
//       max: [10, "Rating cannot be more than 10"],
//     },
//     wins: [
//       {
//         type: String,
//         trim: true,
//         maxlength: [200, "Each win cannot be more than 200 characters"],
//       },
//     ],
//     challenges: [
//       {
//         type: String,
//         trim: true,
//         maxlength: [200, "Each challenge cannot be more than 200 characters"],
//       },
//     ],
//     lessons: [
//       {
//         type: String,
//         trim: true,
//         maxlength: [200, "Each lesson cannot be more than 200 characters"],
//       },
//     ],
//     gratitude: [
//       {
//         type: String,
//         trim: true,
//         maxlength: [
//           200,
//           "Each gratitude item cannot be more than 200 characters",
//         ],
//       },
//     ],
//     nextWeekIntentions: [
//       {
//         type: String,
//         trim: true,
//         maxlength: [200, "Each intention cannot be more than 200 characters"],
//       },
//     ],
//     overallReflection: {
//       type: String,
//       trim: true,
//       maxlength: [
//         1000,
//         "Overall reflection cannot be more than 1000 characters ",
//       ],
//     },
//     mood: {
//       type: String,
//       enum: ["excellent", "good", "neutral", "challenging", "difficult"],
//       default: "neutral",
//     },
//     productivityRating: {
//       type: Number,
//       min: 1,
//       max: 10,
//     },
//     healthRating: {
//       type: Number,
//       min: 1,
//       max: 10,
//     },
//     isComplete: {
//       type: Boolean,
//       dafault: false,
//     },
//     user: {
//       type: mongoose.Schema.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// reflectionSchema.index({ user: 1, weekStartDate: -1 });

// reflectionSchema.virtual("weekNumber").get(function () {
//   const damte = new Date(this.weekStartDate);
//   const startOfYear = new Date(Date.getFullYear(), 0, 1);
//   const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
//   return Math.ceil((days + startOfYear.getDay() + 1) / 7);
// });

// reflectionSchema.virtual("totalItems").get(function () {
//   return (
//     this.wins.length +
//     this.challenges.length +
//     this.lessons.length +
//     this.gratitude.length +
//     this.nextWeekIntentions.length
//   );
// });

// reflectionSchema.set("toJSON", { virtuals: true });
// reflectionSchema.set("toObject", { virtuals: true });

// reflectionSchema.statics.isSunday = function () {
//   const today = new Date();
//   return today.getDay() === 0;
// };

// reflectionSchema.statics.getCurrentWeekDates = function () {
//   const today = new Date();
//   const day = today.getDay();

//   // Calculate Monday (start of week)
//   const monday = new Date(today);
//   monday.setDate(today.getDate() - ((day + 6) % 7));
//   monday.setHours(0, 0, 0, 0);

//   // Calculate Sunday (end of week)
//   const sunday = new Date(monday);
//   sunday.setDate(monday.getDate() + 6);
//   sunday.setHours(23, 59, 59, 999);

//   return { weekStartDate: monday, weekEndDate: sunday };
// };

// reflectionSchema.statics.getWeekDates = function (date) {
//   const targetDate = new Date(date);
//   const day = targetDate.getDay();

//   const monday = new Date(targetDate);
//   monday.setDate(targetDate.getDate() - ((day + 6) % 7));
//   monday.setHours(0, 0, 0, 0);

//   const sunday = new Date(monday);
//   sunday.setDate(monday.getDate() + 6);
//   sunday.setHours(23, 59, 59, 999);

//   return { weekStartDate: monday, weekEndDate: sunday };
// };

// reflectionSchema.methods.getCompletePercentage = function () {
//   let completed = 0;
//   let total = 9;

//   if (this.weekRating) completed++;
//   if (this.wins.length > 0) completed++;
//   if (this.challenges.length > 0) completed++;
//   if (this.lessons.length > 0) completed++;
//   if (this.gratitude.length > 0) completed++;
//   if (this.nextWeekIntentions.length > 0) completed++;
//   if (this.overallReflection) completed++;
//   if (this.mood) completed++;
//   if (this.productivityRating) completed++;

//   return Math.round((completed / total) * 100);
// };

// export default mongoose.model("Reflection", reflectionSchema);



import mongoose from "mongoose";

const reflectionSchema = new mongoose.Schema(
  {
    weekStartDate: {
      type: Date,
      required: [true, "Please add week start date"],
    },

    weekEndDate: {
      type: Date,
      required: [true, "Please add week end date"],
    },

    weekRating: {
      type: Number,
      required: [true, "Please rate your week (1-10)"],
      min: [1, "Rating must be at least 1"],
      max: [10, "Rating cannot be more than 10"],
    },

    wins: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Each win cannot exceed 200 characters"],
      },
    ],

    challenges: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Each challenge cannot exceed 200 characters"],
      },
    ],

    lessons: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Each lesson cannot exceed 200 characters"],
      },
    ],

    gratitude: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Each gratitude item cannot exceed 200 characters"],
      },
    ],

    nextWeekIntentions: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Each intention cannot exceed 200 characters"],
      },
    ],

    overallReflection: {
      type: String,
      trim: true,
      maxlength: [1000, "Overall reflection cannot exceed 1000 characters"],
    },

    mood: {
      type: String,
      enum: ["excellent", "good", "neutral", "challenging", "difficult"],
      default: "neutral",
    },

    productivityRating: {
      type: Number,
      min: 1,
      max: 10,
    },

    healthRating: {
      type: Number,
      min: 1,
      max: 10,
    },

    isComplete: {
      type: Boolean,
      default: false, // ✅ fixed
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);



// ================= INDEX =================
reflectionSchema.index({ user: 1, weekStartDate: -1 });



// ================= VIRTUALS =================

// Week number of the year
reflectionSchema.virtual("weekNumber").get(function () {
  const date = new Date(this.weekStartDate);
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diffInDays = Math.floor(
    (date - startOfYear) / (1000 * 60 * 60 * 24)
  );

  return Math.ceil((diffInDays + startOfYear.getDay() + 1) / 7);
});

// Total filled sections
reflectionSchema.virtual("totalItems").get(function () {
  return (
    (this.wins?.length || 0) +
    (this.challenges?.length || 0) +
    (this.lessons?.length || 0) +
    (this.gratitude?.length || 0) +
    (this.nextWeekIntentions?.length || 0)
  );
});

reflectionSchema.set("toJSON", { virtuals: true });
reflectionSchema.set("toObject", { virtuals: true });



// ================= STATIC METHODS =================

// Check if today is Sunday
reflectionSchema.statics.isSunday = function () {
  return new Date().getDay() === 0;
};

// Get current week (Monday to Sunday)
reflectionSchema.statics.getCurrentWeekDates = function () {
  const today = new Date();
  const day = today.getDay();

  const monday = new Date(today);
  monday.setDate(today.getDate() - ((day + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { weekStartDate: monday, weekEndDate: sunday };
};

// Get week dates for any given date
reflectionSchema.statics.getWeekDates = function (date) {
  const target = new Date(date);
  const day = target.getDay();

  const monday = new Date(target);
  monday.setDate(target.getDate() - ((day + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { weekStartDate: monday, weekEndDate: sunday };
};



// ================= INSTANCE METHODS =================

// Calculate completion %
reflectionSchema.methods.getCompletePercentage = function () {
  let completed = 0;
  const total = 9;

  if (this.weekRating) completed++;
  if (this.wins?.length) completed++;
  if (this.challenges?.length) completed++;
  if (this.lessons?.length) completed++;
  if (this.gratitude?.length) completed++;
  if (this.nextWeekIntentions?.length) completed++;
  if (this.overallReflection) completed++;
  if (this.mood) completed++;
  if (this.productivityRating) completed++;

  return Math.round((completed / total) * 100);
};



export default mongoose.model("Reflection", reflectionSchema);
