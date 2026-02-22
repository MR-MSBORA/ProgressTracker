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

// ============================================
// DAY 10 - PART 1: Basic Analytics
// ============================================

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

// ============================================
// DAY 11 - PART 2: Advanced Analytics
// ============================================

// @desc    Get heatmap data for activity calendar
// @route   GET /api/analytics/heatmap
// @access  Private
export const getHeatmapData = async (req, res) => {
  try {
    // Get date range (default: last 365 days)
    const days = parseInt(req.query.days) || 365;
    const { startDate, endDate } = getLastNDays(days);

    // Get all tasks in date range
    const tasks = await Task.find({
      user: req.user.id,
      createdAt: { $gte: startDate, $lte: endDate },
    });

    // Group tasks by date
    const tasksByDate = groupTasksByDate(tasks);

    // Create heatmap data array
    const heatmapData = [];
    const allDates = getDateRange(startDate, endDate);

    allDates.forEach((dateStr) => {
      const dayData = tasksByDate[dateStr] || {
        total: 0,
        completed: 0,
        pending: 0,
        inProgress: 0,
      };

      // Calculate intensity level (0-4)
      let intensity = 0;
      if (dayData.total > 0) {
        if (dayData.completed >= 10) intensity = 4;
        else if (dayData.completed >= 7) intensity = 3;
        else if (dayData.completed >= 4) intensity = 2;
        else if (dayData.completed >= 1) intensity = 1;
      }

      heatmapData.push({
        date: dateStr,
        count: dayData.total,
        completed: dayData.completed,
        pending: dayData.pending,
        inProgress: dayData.inProgress,
        intensity, // 0 = no activity, 4 = high activity
      });
    });

    // Calculate summary statistics
    const totalDays = heatmapData.length;
    const activeDays = heatmapData.filter((d) => d.count > 0).length;
    const totalCompleted = heatmapData.reduce((sum, d) => sum + d.completed, 0);
    const maxDay = heatmapData.reduce(
      (max, d) => (d.completed > max.completed ? d : max),
      heatmapData[0]
    );

    res.status(200).json({
      success: true,
      data: {
        heatmap: heatmapData,
        summary: {
          totalDays,
          activeDays,
          totalCompleted,
          activityRate: calculatePercentage(activeDays, totalDays),
          bestDay: {
            date: maxDay.date,
            completed: maxDay.completed,
          },
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

// @desc    Generate smart insights based on user data
// @route   GET /api/analytics/insights
// @access  Private
export const getSmartInsights = async (req, res) => {
  try {
    const { startDate, endDate } = getLastNDays(30);

    // Get all data for analysis
    const tasks = await Task.find({
      user: req.user.id,
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const goals = await Goal.find({ user: req.user.id });
    const skills = await Skill.find({ user: req.user.id });
    const reflections = await Reflection.find({ user: req.user.id });

    const insights = [];

    // Insight 1: Task Completion Trend
    const completedTasks = tasks.filter((t) => t.status === "completed").length;
    const completionRate = calculatePercentage(completedTasks, tasks.length);

    if (completionRate >= 80) {
      insights.push({
        type: "positive",
        category: "productivity",
        title: "Excellent Task Completion",
        message: `You're crushing it! ${completionRate}% completion rate in the last 30 days. Keep up the amazing work!`,
        icon: "🎯",
      });
    } else if (completionRate < 50) {
      insights.push({
        type: "improvement",
        category: "productivity",
        title: "Room for Improvement",
        message: `Your completion rate is ${completionRate}%. Try breaking tasks into smaller chunks or setting realistic daily goals.`,
        icon: "💡",
      });
    }

    // Insight 2: Most Productive Day
    const tasksByDate = groupTasksByDate(tasks);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayStats = {};
    
    Object.keys(tasksByDate).forEach((dateStr) => {
      const date = new Date(dateStr);
      const dayName = days[date.getDay()];
      if (!dayStats[dayName]) {
        dayStats[dayName] = { total: 0, completed: 0 };
      }
      dayStats[dayName].total += tasksByDate[dateStr].total;
      dayStats[dayName].completed += tasksByDate[dateStr].completed;
    });

    let bestDay = null;
    let maxCompleted = 0;
    Object.keys(dayStats).forEach((day) => {
      if (dayStats[day].completed > maxCompleted) {
        maxCompleted = dayStats[day].completed;
        bestDay = day;
      }
    });

    if (bestDay) {
      insights.push({
        type: "info",
        category: "patterns",
        title: "Your Most Productive Day",
        message: `${bestDay} is your power day! You complete ${maxCompleted} tasks on average. Schedule important work for ${bestDay}s.`,
        icon: "📊",
      });
    }

    // Insight 3: Streak Status
    const streakData = await getStreakData(req.user.id);
    
    if (streakData.currentStreak >= 7) {
      insights.push({
        type: "positive",
        category: "consistency",
        title: "Amazing Streak!",
        message: `${streakData.currentStreak} days streak! You're building powerful habits. Don't break the chain!`,
        icon: "🔥",
      });
    } else if (streakData.currentStreak === 0) {
      insights.push({
        type: "motivation",
        category: "consistency",
        title: "Start Fresh",
        message: `No active streak. Complete just one task today to start building momentum!`,
        icon: "🚀",
      });
    }

    // Insight 4: Goal Progress
    const activeGoals = goals.filter((g) => g.status === "active");
    const goalsCloseToCompletion = activeGoals.filter((g) => g.progress >= 80);

    if (goalsCloseToCompletion.length > 0) {
      insights.push({
        type: "motivation",
        category: "goals",
        title: "Almost There!",
        message: `You're 80%+ done with ${goalsCloseToCompletion.length} goal(s). A final push will get you across the finish line!`,
        icon: "🎉",
      });
    }

    // Insight 5: Skill Practice Consistency
    const skillsWithLogs = skills.filter((s) => s.practiceLogs.length > 0);
    
    if (skillsWithLogs.length > 0) {
      const totalHours = skillsWithLogs.reduce((sum, s) => sum + s.totalHours, 0);
      
      if (totalHours >= 20) {
        insights.push({
          type: "positive",
          category: "learning",
          title: "Dedicated Learner",
          message: `${Math.round(totalHours)} hours of practice logged! You're investing in your growth consistently.`,
          icon: "📚",
        });
      }
    } else {
      insights.push({
        type: "suggestion",
        category: "learning",
        title: "Start Learning",
        message: `Add a skill you want to learn and start tracking your practice. Small daily steps lead to mastery!`,
        icon: "🎓",
      });
    }

    // Insight 6: Reflection Habit
    if (reflections.length >= 4) {
      insights.push({
        type: "positive",
        category: "reflection",
        title: "Self-Aware Growth",
        message: `You've completed ${reflections.length} weekly reflections. This self-awareness accelerates your growth!`,
        icon: "🧠",
      });
    } else if (reflections.length === 0) {
      insights.push({
        type: "suggestion",
        category: "reflection",
        title: "Try Weekly Reflections",
        message: `Weekly reflections help you learn from wins and challenges. Start this Sunday!`,
        icon: "✍️",
      });
    }

    // Insight 7: Priority Balance
    const highPriorityTasks = tasks.filter((t) => t.priority === "high");
    const highPriorityCompleted = highPriorityTasks.filter(
      (t) => t.status === "completed"
    ).length;

    if (highPriorityTasks.length > 0) {
      const highPriorityRate = calculatePercentage(
        highPriorityCompleted,
        highPriorityTasks.length
      );

      if (highPriorityRate >= 80) {
        insights.push({
          type: "positive",
          category: "priorities",
          title: "Focused Execution",
          message: `${highPriorityRate}% of high-priority tasks completed. You're excellent at focusing on what matters most!`,
          icon: "🎯",
        });
      } else if (highPriorityRate < 50) {
        insights.push({
          type: "improvement",
          category: "priorities",
          title: "Focus on High-Priority",
          message: `Only ${highPriorityRate}% of high-priority tasks done. Try tackling your most important task first each day.`,
          icon: "⚡",
        });
      }
    }

    res.status(200).json({
      success: true,
      count: insights.length,
      data: insights,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Get productivity patterns and recommendations
// @route   GET /api/analytics/patterns
// @access  Private
export const getProductivityPatterns = async (req, res) => {
  try {
    const { startDate, endDate } = getLastNDays(30);

    const tasks = await Task.find({
      user: req.user.id,
      createdAt: { $gte: startDate, $lte: endDate },
    });

    if (tasks.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          message: "Not enough data yet. Complete some tasks to see patterns!",
        },
      });
    }

    // Analyze by day of week
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayAnalysis = {};

    days.forEach((day) => {
      dayAnalysis[day] = { total: 0, completed: 0, completionRate: 0 };
    });

    tasks.forEach((task) => {
      const dayName = days[new Date(task.createdAt).getDay()];
      dayAnalysis[dayName].total++;
      if (task.status === "completed") {
        dayAnalysis[dayName].completed++;
      }
    });

    // Calculate completion rates
    Object.keys(dayAnalysis).forEach((day) => {
      dayAnalysis[day].completionRate = calculatePercentage(
        dayAnalysis[day].completed,
        dayAnalysis[day].total
      );
    });

    // Find best and worst days
    let bestDay = { name: "", rate: 0 };
    let worstDay = { name: "", rate: 100 };

    Object.keys(dayAnalysis).forEach((day) => {
      if (dayAnalysis[day].total > 0) {
        if (dayAnalysis[day].completionRate > bestDay.rate) {
          bestDay = { name: day, rate: dayAnalysis[day].completionRate };
        }
        if (dayAnalysis[day].completionRate < worstDay.rate) {
          worstDay = { name: day, rate: dayAnalysis[day].completionRate };
        }
      }
    });

    // Generate recommendations
    const recommendations = [];

    if (bestDay.rate >= 80) {
      recommendations.push({
        type: "optimize",
        message: `Schedule important tasks on ${bestDay.name}s (${bestDay.rate}% completion rate)`,
      });
    }

    if (worstDay.rate < 50 && worstDay.name) {
      recommendations.push({
        type: "improve",
        message: `${worstDay.name}s need attention (${worstDay.rate}% completion rate). Try lighter workload or better planning.`,
      });
    }

    // Analyze by priority
    const priorityAnalysis = {
      high: { total: 0, completed: 0 },
      medium: { total: 0, completed: 0 },
      low: { total: 0, completed: 0 },
    };

    tasks.forEach((task) => {
      priorityAnalysis[task.priority].total++;
      if (task.status === "completed") {
        priorityAnalysis[task.priority].completed++;
      }
    });

    Object.keys(priorityAnalysis).forEach((priority) => {
      priorityAnalysis[priority].completionRate = calculatePercentage(
        priorityAnalysis[priority].completed,
        priorityAnalysis[priority].total
      );
    });

    // Weekly averages
    const weeklyAverages = {
      tasksPerWeek: Math.round(tasks.length / 4.3), // Approx 4.3 weeks in 30 days
      completedPerWeek: Math.round(
        tasks.filter((t) => t.status === "completed").length / 4.3
      ),
    };

    res.status(200).json({
      success: true,
      data: {
        dayOfWeek: {
          analysis: dayAnalysis,
          bestDay: bestDay.name ? bestDay : null,
          worstDay: worstDay.name ? worstDay : null,
        },
        priority: priorityAnalysis,
        weeklyAverages,
        recommendations,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};