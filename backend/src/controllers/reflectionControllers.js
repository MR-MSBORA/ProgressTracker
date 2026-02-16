import Reflection from "../models/Reflection.js";

// @desc    Create new reflection
// @route   POST /api/reflections
// @access  Private
export const createReflection = async (req, res) => {
  try {
    // Get week dates if not provided
    if (!req.body.weekStartDate || !req.body.weekEndDate) {
      const weekDates = Reflection.getCurrentWeekDates();
      req.body.weekStartDate = weekDates.weekStartDate;
      req.body.weekEndDate = weekDates.weekEndDate;
    }

    // Check if reflection already exists for this week
    const existingReflection = await Reflection.findOne({
      user: req.user.id,
      weekStartDate: req.body.weekStartDate,
    });

    if (existingReflection) {
      return res.status(400).json({
        success: false,
        error: "Reflection already exists for this week",
      });
    }

    req.body.user = req.user.id;
    const reflection = await Reflection.create(req.body);

    res.status(201).json({
      success: true,
      data: reflection,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Get all reflections for user
// @route   GET /api/reflections
// @access  Private
export const getReflections = async (req, res) => {
  try {
    let query = { user: req.user.id };

    // Filter by completion status
    if (req.query.isComplete !== undefined) {
      query.isComplete = req.query.isComplete === "true";
    }

    // Filter by mood
    if (req.query.mood) {
      query.mood = req.query.mood;
    }

    // Filter by rating range
    if (req.query.minRating) {
      query.weekRating = { $gte: parseInt(req.query.minRating) };
    }

    const reflections = await Reflection.find(query).sort("-weekStartDate");

    res.status(200).json({
      success: true,
      count: reflections.length,
      data: reflections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Get single reflection
// @route   GET /api/reflections/:id
// @access  Private
export const getReflection = async (req, res) => {
  try {
    const reflection = await Reflection.findById(req.params.id);

    if (!reflection) {
      return res.status(404).json({
        success: false,
        error: "Reflection not found",
      });
    }

    // Check ownership
    if (reflection.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to access this reflection",
      });
    }

    res.status(200).json({
      success: true,
      data: reflection,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Reflection not found",
      });
    }
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Update reflection
// @route   PUT /api/reflections/:id
// @access  Private
export const updateReflection = async (req, res) => {
  try {
    let reflection = await Reflection.findById(req.params.id);

    if (!reflection) {
      return res.status(404).json({
        success: false,
        error: "Reflection not found",
      });
    }

    if (reflection.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to update this reflection",
      });
    }

    reflection = await Reflection.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: reflection,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Delete reflection
// @route   DELETE /api/reflections/:id
// @access  Private
export const deleteReflection = async (req, res) => {
  try {
    const reflection = await Reflection.findById(req.params.id);

    if (!reflection) {
      return res.status(404).json({
        success: false,
        error: "Reflection not found",
      });
    }

    if (reflection.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to delete this reflection",
      });
    }

    await reflection.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Get current week reflection
// @route   GET /api/reflections/current/week
// @access  Private
export const getCurrentWeekReflection = async (req, res) => {
  try {
    const weekDates = Reflection.getCurrentWeekDates();

    const reflection = await Reflection.findOne({
      user: req.user.id,
      weekStartDate: weekDates.weekStartDate,
    });

    if (!reflection) {
      return res.status(404).json({
        success: false,
        error: "No reflection found for current week",
        weekDates,
      });
    }

    res.status(200).json({
      success: true,
      data: reflection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Check if it's Sunday
// @route   GET /api/reflections/check/sunday
// @access  Private
export const checkSunday = async (req, res) => {
  try {
    const isSunday = Reflection.isSunday();
    const weekDates = Reflection.getCurrentWeekDates();

    // Check if user already created reflection for this week
    const existingReflection = await Reflection.findOne({
      user: req.user.id,
      weekStartDate: weekDates.weekStartDate,
    });

    res.status(200).json({
      success: true,
      data: {
        isSunday,
        shouldCreateReflection: isSunday && !existingReflection,
        hasReflectionForWeek: !!existingReflection,
        currentWeek: weekDates,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Get reflection statistics
// @route   GET /api/reflections/stats/summary
// @access  Private
export const getReflectionStats = async (req, res) => {
  try {
    const reflections = await Reflection.find({ user: req.user.id });

    const totalReflections = reflections.length;
    const completedReflections = reflections.filter((r) => r.isComplete).length;

    // Calculate average ratings
    const totalRating = reflections.reduce((sum, r) => sum + r.weekRating, 0);
    const averageRating =
      totalReflections > 0 ? (totalRating / totalReflections).toFixed(1) : 0;

    const totalProductivity = reflections.reduce(
      (sum, r) => sum + (r.productivityRating || 0),
      0
    );
    const averageProductivity =
      totalReflections > 0
        ? (totalProductivity / totalReflections).toFixed(1)
        : 0;

    const totalHealth = reflections.reduce(
      (sum, r) => sum + (r.healthRating || 0),
      0
    );
    const averageHealth =
      totalReflections > 0 ? (totalHealth / totalReflections).toFixed(1) : 0;

    // Count by mood
    const moodBreakdown = {
      excellent: reflections.filter((r) => r.mood === "excellent").length,
      good: reflections.filter((r) => r.mood === "good").length,
      neutral: reflections.filter((r) => r.mood === "neutral").length,
      challenging: reflections.filter((r) => r.mood === "challenging").length,
      difficult: reflections.filter((r) => r.mood === "difficult").length,
    };

    // Count total wins, challenges, lessons
    const totalWins = reflections.reduce((sum, r) => sum + r.wins.length, 0);
    const totalChallenges = reflections.reduce(
      (sum, r) => sum + r.challenges.length,
      0
    );
    const totalLessons = reflections.reduce(
      (sum, r) => sum + r.lessons.length,
      0
    );

    // Get recent reflections (last 4 weeks)
    const recentReflections = reflections
      .sort((a, b) => b.weekStartDate - a.weekStartDate)
      .slice(0, 4)
      .map((r) => ({
        weekStartDate: r.weekStartDate,
        weekRating: r.weekRating,
        mood: r.mood,
      }));

    res.status(200).json({
      success: true,
      data: {
        totalReflections,
        completedReflections,
        averageRating: parseFloat(averageRating),
        averageProductivity: parseFloat(averageProductivity),
        averageHealth: parseFloat(averageHealth),
        moodBreakdown,
        insights: {
          totalWins,
          totalChallenges,
          totalLessons,
        },
        recentTrend: recentReflections,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};