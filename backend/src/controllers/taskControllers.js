import Task from "../models/Task.js";

// ============================================
// CREATE TASK
// ============================================
export const createTask = async (req, res) => {
  try {
    req.body.user = req.user.id;

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================
// GET ALL TASKS
// ============================================
export const getTasks = async (req, res) => {
  try {
    const { status, priority } = req.query;

    const query = { user: req.user.id };

    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error("GET TASKS ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================
// UPDATE TASK
// ============================================
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================
// DELETE TASK
// ============================================
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE TASK ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================
// TOGGLE COMPLETE
// ============================================
export const markComplete = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    // toggle
    if (task.status === "completed") {
      task.status = "pending";
      task.completedAt = null;
    } else {
      task.status = "completed";
      task.completedAt = new Date();
    }

    await task.save();

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error("TOGGLE COMPLETE ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ============================================
// DAILY SCORE
// ============================================
export const getDailyScore = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    const completed = tasks.filter(t => t.status === "completed").length;

    res.status(200).json({
      success: true,
      data: {
        totalTasks: tasks.length,
        completedTasks: completed,
      },
    });
  } catch (error) {
    console.error("DAILY SCORE ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};