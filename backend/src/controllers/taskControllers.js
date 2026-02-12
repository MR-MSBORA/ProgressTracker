import Task from "../models/Task.js"; // Import Task model to interact with MongoDB

export const createTask = async (req, res) => {
  try {
    // Attach logged-in user's ID to task data
    req.body.user = req.user.id;

    // Create new task document in database
    const task = await Task.create(req.body);

    // Send success response after task creation
    res.status(201).json({
      success: true,
      data: task,
      message: "Task Created !!!",
    });
  } catch (error) {
    // Handle Mongoose validation errors (missing fields, invalid values)
    if (error.name === "ValidationError") {
      // Extract readable error messages
      const messages = Object.values(error.errors).map((err) => err.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    }

    // Handle all other unexpected server/database errors
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

//exporting all tasks
export const getTasks = async (req, res) => {
  try {
    // 1️⃣ Create base query → fetch only logged-in user's tasks
    const query = { user: req.user.id };

    // 2️⃣ If date filter is provided → filter tasks of that specific day
    if (req.query.date) {
      const startDate = new Date(req.query.date); // Start of day
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(req.query.date); // End of day
      endDate.setHours(23, 59, 59, 999);

      // Add date range filter to query
      query.createdAt = {
        $gte: startDate, // Greater than or equal to start time
        $lte: endDate, // Less than or equal to end time
      };
    }

    // 3️⃣ If status filter exists → add status condition
    if (req.query.status) {
      query.status = req.query.status;
    }

    // 4️⃣ If priority filter exists → add priority condition
    if (req.query.priority) {
      query.priority = req.query.priority;
    }

    // 5️⃣ Fetch tasks from database based on built query
    // .select("-createdAt") → exclude createdAt field from result
    const tasks = await Task.find(query).select("-createdAt");

    // 6️⃣ Send success response with task data
    res.status(201).json({
      success: true,
      count: tasks.length, // Total tasks found
      data: tasks,
    });
  } catch (error) {
    // 7️⃣ Handle errors if something goes wrong
    console.log("ERROR IN GET_TASKS ", error);

    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

//export single task
export const getTask = async (req, res) => {
  try {
    // 1️⃣ Find task using ID from URL (req.params.id)
    const task = await Task.findById(req.params.id);

    // 2️⃣ If task not found → send error response
    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
        success: false,
      });
    }

    // 3️⃣ Check if logged-in user owns this task
    // Convert ObjectId to string before comparing
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to access this task",
      });
    }

    // 4️⃣ If task exists and user is authorized → send task data
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    // 5️⃣ If invalid MongoDB ID format → return 404
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    // 6️⃣ Any other unexpected server error
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

//update task
export const updateTask = async (req, res) => {
  try {
    // 1️⃣ Find task by ID from URL parameter
    let task = await Task.findById(req.params.id);

    // 2️⃣ If task does not exist → return 404
    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
        success: false,
      });
    }

    // 3️⃣ Check if logged-in user owns the task
    // Convert ObjectId to string before comparison
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to update this task",
      });
    }

    // 4️⃣ Update task with new data from request body
    // new: true → return updated document
    // runValidators: true → apply schema validation rules
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // 5️⃣ Send updated task as response
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    // 6️⃣ If validation fails → return 400 with error messages
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    }

    // 7️⃣ Any other unexpected server error
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

export const markComplete = async (req, res) => {
  try {
    // 1️⃣ Find task by ID from URL parameter
    const task = await Task.findById(req.params.id);

    // 2️⃣ If task does not exist → return 404 error
    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    // 3️⃣ Check if the logged-in user owns this task
    // Convert MongoDB ObjectId to string before comparing
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized",
      });
    }

    // 4️⃣ Toggle task status
    // If current status is "completed" → change to "pending"
    // Otherwise → change to "completed"
    task.status = task.status === "completed" ? "pending" : "completed";

    // 5️⃣ Save the updated task in the database
    await task.save();

    // 6️⃣ Send success response with updated task
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    // 7️⃣ Handle any unexpected server errors
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    // 1️⃣ Find task by ID from URL parameter
    const task = await Task.findById(req.params.id);

    // 2️⃣ If task does not exist → return 404
    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    // 3️⃣ Check if logged-in user owns this task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to delete this task",
      });
    }

    // 4️⃣ Delete the task from database
    await task.deleteOne();

    // 5️⃣ Send success response (empty object returned)
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    // 6️⃣ Handle unexpected server errors
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

export const getDailyScore = async (req, res) => {
  try {
    // 1️⃣ Get date from query OR use today's date
    const targetDate = req.query.date ? new Date(req.query.date) : new Date();

    // 2️⃣ Set start of day (00:00:00)
    const startDate = new Date(targetDate);
    startDate.setHours(0, 0, 0, 0);

    // 3️⃣ Set end of day (23:59:59)
    const endDate = new Date(targetDate);
    endDate.setHours(23, 59, 59, 999);

    // 4️⃣ Fetch all tasks for logged-in user on that date
    const tasks = await Task.find({
      user: req.user.id,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    // 5️⃣ Count tasks by status
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "completed").length;
    const pendingTasks = tasks.filter((t) => t.status === "pending").length;
    const inProgressTasks = tasks.filter(
      (t) => t.status === "in-progress",
    ).length;

    // 6️⃣ Calculate completion percentage
    const completionRate =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // 7️⃣ Calculate score based on completed task priority
    // low = 1 point, medium = 2, high = 3
    let score = 0;
    tasks.forEach((task) => {
      if (task.status === "completed") {
        const points = { low: 1, medium: 2, high: 3 };
        score += points[task.priority] || 1;
      }
    });

    // 8️⃣ Calculate maximum possible score for the day
    const maxScore = tasks.reduce((sum, task) => {
      const points = { low: 1, medium: 2, high: 3 };
      return sum + (points[task.priority] || 1);
    }, 0);

    // 9️⃣ Send daily stats response
    res.status(200).json({
      success: true,
      data: {
        date: targetDate.toISOString().split("T")[0], // Format date YYYY-MM-DD
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
        completionRate,
        score,
        maxScore,
        breakdown: {
          high: tasks.filter((t) => t.priority === "high").length,
          medium: tasks.filter((t) => t.priority === "medium").length,
          low: tasks.filter((t) => t.priority === "low").length,
        },
      },
    });
  } catch (error) {
    // 🔟 Handle server errors
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
