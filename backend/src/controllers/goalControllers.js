// Import Goal model
import Goal from "../models/Goal.js";


// =============================
// Create a new goal
// =============================
export const createGoal = async (req, res) => {
  try {
    // Attach logged-in user's ID to the goal
    req.body.user = req.user.id;

    // Create goal in database
    const goal = await Goal.create(req.body);

    // Send success response
    res.status(201).json({
      success: true,
      data: goal,
    });

  } catch (error) {

    // Handle validation errors (like missing title, invalid target, etc.)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    }

    // Handle server errors
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// =============================
// Get all goals of logged-in user
// =============================
export const getGoals = async (req, res) => {
  try {

    // Base query: only fetch goals of logged-in user
    const query = { user: req.user.id };

    // Optional filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Optional filter by period (daily, weekly, monthly)
    if (req.query.period) {
      query.period = req.query.period;
    }

    // If active=true → get active and paused goals
    if (req.query.active === "true") {
      query.status = { $in: ["active", "paused"] };
    }

    // Find goals and sort by newest first
    const goals = await Goal.find(query).sort("-createdAt");

    // Send response
    res.status(200).json({
      success: true,
      count: goals.length,
      data: goals,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};



// =============================
// Get a single goal by ID
// =============================
export const getGoal = async (req, res) => {
  try {

    // Find goal by ID
    const goal = await Goal.findById(req.params.id);

    // If goal does not exist
    if (!goal) {
      return res.status(404).json({
        success: false,
        error: "Goal not found",
      });
    }

    // Check if logged-in user owns this goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to access this goal",
      });
    }

    // Return goal
    res.status(200).json({
      success: true,
      data: goal,
    });

  } catch (error) {

    // If invalid ObjectId format
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Goal not found",
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};



// =============================
// Update a goal
// =============================
export const updateGoal = async (req, res) => {
  try {

    // Find goal first
    let goal = await Goal.findById(req.params.id);

    // If goal not found
    if (!goal) {
      return res.status(404).json({
        success: false,
        error: "Goal not found",
      });
    }

    // Check ownership
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to update this goal",
      });
    }

    // Update goal and return updated version
    goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,          // Return updated document
      runValidators: true // Apply schema validation
    });

    res.status(200).json({
      success: true,
      data: goal,
    });

  } catch (error) {

    // Handle validation errors
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



// =============================
// Delete a goal
// =============================
export const deleteGoal = async (req, res) => {
  try {

    // Find goal
    const goal = await Goal.findById(req.params.id);

    // If not found
    if (!goal) {
      return res.status(404).json({
        success: false,
        error: "Goal not found",
      });
    }

    // Check ownership
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to delete this goal",
      });
    }

    // Delete goal
    await goal.deleteOne();

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



// =============================
// Update goal progress
// =============================
export const updateProgress = async (req, res) => {
  try {

    // Find goal
    const goal = await Goal.findById(req.params.id);

    // If not found
    if (!goal) {
      return res.status(404).json({
        success: false,
        error: "Goal not found",
      });
    }

    // Check ownership
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized",
      });
    }

    // Get increment value (default is 1)
    const increment = req.body.increment || 1;

    // Call schema method to update progress
    goal.updateProgress(increment);

    // Save updated goal
    await goal.save();

    res.status(200).json({
      success: true,
      data: goal,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};



// =============================
// Get goal statistics (Dashboard data)
// =============================
export const getGoalStats = async (req, res) => {
  try {

    // Get all goals of logged-in user
    const goals = await Goal.find({ user: req.user.id });

    // Count different types of goals
    const totalGoals = goals.length;
    const activeGoals = goals.filter((g) => g.status === "active").length;
    const completedGoals = goals.filter((g) => g.status === "completed").length;
    const failedGoals = goals.filter((g) => g.status === "failed").length;

    // Calculate average progress
    const totalProgress = goals.reduce((sum, goal) => sum + goal.progress, 0);
    const averageProgress =
      totalGoals > 0 ? Math.round(totalProgress / totalGoals) : 0;

    // Calculate completion rate percentage
    const completionRate =
      totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

    res.status(200).json({
      success: true,
      data: {
        totalGoals,
        activeGoals,
        completedGoals,
        failedGoals,
        averageProgress,
        completionRate,
        breakdown: {
          daily: goals.filter((g) => g.period === "daily").length,
          weekly: goals.filter((g) => g.period === "weekly").length,
          monthly: goals.filter((g) => g.period === "monthly").length,
        },
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
