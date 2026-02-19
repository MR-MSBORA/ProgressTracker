import Task from "../models/Task.js";
import Goal from "../models/Goal.js";
import Skill from "../models/Skills.js";
import Reflection from "../models/Reflection.js";
import {
  getCurrentWeek,
  getCurrentMonth,
  getLastNDays,
  formatDate,
  groupTasksByDate,
  calculatePercentage,
  isToday,
  isYesterday,
  daysDifference,
  getDateRange,
} from "../utils/analyticsHelpers.js";

// @desc    Calculate current and longest streak
// @route   GET /api/analytics/streak
// @access  Private
export const getStreak = async (req, res) => {
  try {
    // Get all tasks for user, sorted by date
    const tasks = await Task.find({ user: req.user.id }).sort("createdAt");

    if (tasks.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          currentStreak: 0,
          longestStreak: 0,
          lastActivityDate: null,
        },
      });
    }

    // Group tasks by date
    const tasksByDate = groupTasksByDate(tasks);
    const dates = Object.keys(tasksByDate).sort();

    // Calculate current streak
    let currentStreak = 0;
    let checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);

    // Check if there's activity today or yesterday
    const todayStr = formatDate(new Date());
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayStr = formatDate(yesterdayDate);

    let streakActive = false;

    // Start counting from today or yesterday
    if (tasksByDate[todayStr] && tasksByDate[todayStr].completed > 0) {
      streakActive = true;
    } else if (tasksByDate[yesterdayStr] && tasksByDate[yesterdayStr].completed > 0) {
      streakActive = true;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    // Count consecutive days with completed tasks
    if (streakActive) {
      while (true) {
        const dateStr = formatDate(checkDate);
        if (tasksByDate[dateStr] && tasksByDate[dateStr].completed > 0) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 0;
    let previousDate = null;

    dates.forEach((dateStr) => {
      if (tasksByDate[dateStr].completed > 0) {
        if (previousDate === null) {
          tempStreak = 1;
        } else {
          const diff = daysDifference(previousDate, dateStr);
          if (diff === 1) {
            tempStreak++;
          } else {
            tempStreak = 1;
          }
        }
        longestStreak = Math.max(longestStreak, tempStreak);
        previousDate = dateStr;
      }
    });

    res.status(200).json({
      success: true,
      data: {
        currentStreak,
        longestStreak,
        lastActivityDate: dates[dates.length - 1],
        streakActive,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Calculate consistency score
// @route   GET /api/analytics/consistency
// @access  Private
export const getConsistencyScore = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const { startDate, endDate } = getLastNDays(days);

    // Get all tasks in date range
    const tasks = await Task.find({
      user: req.user.id,
      createdAt: { $gte: startDate, $lte: endDate },
    });

    // Group by date
    const tasksByDate = groupTasksByDate(tasks);
    const allDates = getDateRange(startDate, endDate);

    // Calculate metrics
    let daysWithActivity = 0;
    let daysWithCompletedTasks = 0;
    let totalTasksCreated = tasks.length;
    let totalTasksCompleted = 0;

    allDates.forEach((dateStr) => {
      if (tasksByDate[dateStr]) {
        if (tasksByDate[dateStr].total > 0) {
          daysWithActivity++;
        }
        if (tasksByDate[dateStr].completed > 0) {
          daysWithCompletedTasks++;
        }
        totalTasksCompleted += tasksByDate[dateStr].completed;
      }
    });

    // Calculate consistency score (0-100)
    const activityRate = calculatePercentage(daysWithActivity, allDates.length);
    const completionRate = calculatePercentage(daysWithCompletedTasks, allDates.length);
    const taskCompletionRate = calculatePercentage(totalTasksCompleted, totalTasksCreated);

    // Weighted average
    const consistencyScore = Math.round(
      activityRate * 0.3 + completionRate * 0.4 + taskCompletionRate * 0.3
    );

    res.status(200).json({
      success: true,
      data: {
        consistencyScore,
        period: `${days} days`,
        metrics: {
          daysWithActivity,
          daysWithCompletedTasks,
          totalDays: allDates.length,
          activityRate,
          completionRate,
          taskCompletionRate,
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

// @desc    Get weekly statistics
// @route   GET /api/analytics/weekly
// @access  Private
export const getWeeklyStats = async (req, res) => {
  try {
    const { startDate, endDate } = getCurrentWeek();

    // Get all tasks for this week
    const tasks = await Task.find({
      user: req.user.id,
      createdAt: { $gte: startDate, $lte: endDate },
    });

    // Get goals for this week
    const goals = await Goal.find({
      user: req.user.id,
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
    });

    // Calculate task stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "completed").length;
    const pendingTasks = tasks.filter((t) => t.status === "pending").length;
    const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;

    const taskCompletionRate = calculatePercentage(completedTasks, totalTasks);

    // Group tasks by day
    const tasksByDay = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    };

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    tasks.forEach((task) => {
      const dayName = days[new Date(task.createdAt).getDay()];
      tasksByDay[dayName]++;
    });

    // Calculate goal progress
    const activeGoals = goals.filter((g) => g.status === "active").length;
    const completedGoals = goals.filter((g) => g.status === "completed").length;

    res.status(200).json({
      success: true,
      data: {
        weekPeriod: {
          start: formatDate(startDate),
          end: formatDate(endDate),
        },
        tasks: {
          total: totalTasks,
          completed: completedTasks,
          pending: pendingTasks,
          inProgress: inProgressTasks,
          completionRate: taskCompletionRate,
          byDay: tasksByDay,
        },
        goals: {
          active: activeGoals,
          completed: completedGoals,
          total: goals.length,
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

// @desc    Get monthly statistics
// @route   GET /api/analytics/monthly
// @access  Private
export const getMonthlyStats = async (req, res) => {
  try {
    const { startDate, endDate } = getCurrentMonth();

    // Get all data for this month
    const tasks = await Task.find({
      user: req.user.id,
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const goals = await Goal.find({
      user: req.user.id,
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
    });

    const skills = await Skill.find({ user: req.user.id });

    const reflections = await Reflection.find({
      user: req.user.id,
      weekStartDate: { $gte: startDate, $lte: endDate },
    });

    // Task stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "completed").length;
    const taskCompletionRate = calculatePercentage(completedTasks, totalTasks);

    // Group tasks by priority
    const tasksByPriority = {
      high: tasks.filter((t) => t.priority === "high").length,
      medium: tasks.filter((t) => t.priority === "medium").length,
      low: tasks.filter((t) => t.priority === "low").length,
    };

    // Goal stats
    const completedGoals = goals.filter((g) => g.status === "completed").length;
    const goalCompletionRate = calculatePercentage(completedGoals, goals.length);

    // Skills stats
    const totalPracticeHours = skills.reduce((sum, skill) => sum + skill.totalHours, 0);
    const totalPracticeSessions = skills.reduce(
      (sum, skill) => sum + skill.practiceLogs.length,
      0
    );

    // Calculate week-by-week progress
    const tasksByDate = groupTasksByDate(tasks);
    const allDates = getDateRange(startDate, endDate);

    // Group by weeks
    const weeklyProgress = [];
    let currentWeekStart = new Date(startDate);

    while (currentWeekStart <= endDate) {
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const weekDates = getDateRange(
        currentWeekStart,
        weekEnd > endDate ? endDate : weekEnd
      );

      let weekTotal = 0;
      let weekCompleted = 0;

      weekDates.forEach((date) => {
        if (tasksByDate[date]) {
          weekTotal += tasksByDate[date].total;
          weekCompleted += tasksByDate[date].completed;
        }
      });

      weeklyProgress.push({
        weekStart: formatDate(currentWeekStart),
        weekEnd: formatDate(weekEnd > endDate ? endDate : weekEnd),
        totalTasks: weekTotal,
        completedTasks: weekCompleted,
        completionRate: calculatePercentage(weekCompleted, weekTotal),
      });

      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    }

    res.status(200).json({
      success: true,
      data: {
        monthPeriod: {
          start: formatDate(startDate),
          end: formatDate(endDate),
          month: startDate.toLocaleString("default", { month: "long" }),
          year: startDate.getFullYear(),
        },
        tasks: {
          total: totalTasks,
          completed: completedTasks,
          completionRate: taskCompletionRate,
          byPriority: tasksByPriority,
        },
        goals: {
          total: goals.length,
          completed: completedGoals,
          completionRate: goalCompletionRate,
        },
        skills: {
          totalHours: Math.round(totalPracticeHours * 10) / 10,
          totalSessions: totalPracticeSessions,
          activeSkills: skills.filter((s) => s.isActive).length,
        },
        reflections: {
          total: reflections.length,
          completed: reflections.filter((r) => r.isComplete).length,
        },
        weeklyProgress,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Get dashboard overview
// @route   GET /api/analytics/dashboard
// @access  Private
export const getDashboardOverview = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Today's tasks
    const todayTasks = await Task.find({
      user: req.user.id,
      createdAt: { $gte: today, $lt: tomorrow },
    });

    // Active goals
    const activeGoals = await Goal.find({
      user: req.user.id,
      status: "active",
    });

    // Active skills
    const activeSkills = await Skill.find({
      user: req.user.id,
      isActive: true,
    });

    // Get streak
    const streakData = await getStreakData(req.user.id);

    // Today's completion rate
    const todayCompleted = todayTasks.filter((t) => t.status === "completed").length;
    const todayCompletionRate = calculatePercentage(todayCompleted, todayTasks.length);

    res.status(200).json({
      success: true,
      data: {
        today: {
          date: formatDate(today),
          tasks: {
            total: todayTasks.length,
            completed: todayCompleted,
            pending: todayTasks.filter((t) => t.status === "pending").length,
            completionRate: todayCompletionRate,
          },
        },
        active: {
          goals: activeGoals.length,
          skills: activeSkills.length,
        },
        streak: streakData,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// Helper function to get streak data
async function getStreakData(userId) {
  const tasks = await Task.find({ user: userId }).sort("createdAt");

  if (tasks.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const tasksByDate = groupTasksByDate(tasks);
  const dates = Object.keys(tasksByDate).sort();

  let currentStreak = 0;
  let checkDate = new Date();
  checkDate.setHours(0, 0, 0, 0);

  const todayStr = formatDate(new Date());
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = formatDate(yesterdayDate);

  let streakActive = false;

  if (tasksByDate[todayStr] && tasksByDate[todayStr].completed > 0) {
    streakActive = true;
  } else if (tasksByDate[yesterdayStr] && tasksByDate[yesterdayStr].completed > 0) {
    streakActive = true;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  if (streakActive) {
    while (true) {
      const dateStr = formatDate(checkDate);
      if (tasksByDate[dateStr] && tasksByDate[dateStr].completed > 0) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  let longestStreak = 0;
  let tempStreak = 0;
  let previousDate = null;

  dates.forEach((dateStr) => {
    if (tasksByDate[dateStr].completed > 0) {
      if (previousDate === null) {
        tempStreak = 1;
      } else {
        const diff = daysDifference(previousDate, dateStr);
        if (diff === 1) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      }
      longestStreak = Math.max(longestStreak, tempStreak);
      previousDate = dateStr;
    }
  });

  return { currentStreak, longestStreak };
}