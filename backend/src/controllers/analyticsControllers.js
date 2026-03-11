import Task from "../models/Task.js";

// ============================================
// GET STREAK
// ============================================
// @route GET /api/analytics/streak
export const getStreak = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
      status: "completed",
    }).sort({ completedAt: -1 });

    if (tasks.length === 0) {
      return res.json({
        success: true,
        data: { current: 0, longest: 0, isActive: false },
      });
    }

    const tasksByDate = {};
    tasks.forEach((task) => {
      const date = new Date(task.completedAt || task.updatedAt)
        .toISOString()
        .split("T")[0];
      tasksByDate[date] = true;
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayKey = today.toISOString().split("T")[0];

    // CURRENT STREAK
    let currentStreak = 0;
    let checkDate = new Date(today);

    while (true) {
      const dateKey = checkDate.toISOString().split("T")[0];
      if (tasksByDate[dateKey]) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    // LONGEST STREAK
    const dates = Object.keys(tasksByDate)
      .map((d) => new Date(d))
      .sort((a, b) => a - b);

    let longestStreak = 0;
    let temp = 0;

    for (let i = 0; i < dates.length; i++) {
      if (i === 0) {
        temp = 1;
      } else {
        const diff = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
        if (diff === 1) temp++;
        else temp = 1;
      }
      longestStreak = Math.max(longestStreak, temp);
    }

    const isActive = tasksByDate[todayKey] === true;

    res.json({
      success: true,
      data: {
        current: currentStreak,
        longest: longestStreak,
        isActive,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ============================================
// HEATMAP DATA
// ============================================
// @route GET /api/analytics/heatmap
export const getHeatmapData = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 90;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const tasks = await Task.find({
      user: req.user.id,
      status: "completed",
      completedAt: { $gte: startDate },
    });

    const map = {};
    tasks.forEach((task) => {
      const date = new Date(task.completedAt).toISOString().split("T")[0];
      map[date] = (map[date] || 0) + 1;
    });

    const heatmap = [];
    const current = new Date(startDate);
    const today = new Date();

    while (current <= today) {
      const date = current.toISOString().split("T")[0];
      const count = map[date] || 0;

      let level = 0;
      if (count > 0) level = 1;
      if (count >= 3) level = 2;
      if (count >= 5) level = 3;
      if (count >= 8) level = 4;

      heatmap.push({ date, count, level });
      current.setDate(current.getDate() + 1);
    }

    res.json({
      success: true,
      data: { heatmap },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ============================================
// WEEKLY SUMMARY
// ============================================
// @route GET /api/analytics/weekly-summary
export const getWeeklySummary = async (req, res) => {
  try {
    const today = new Date();

    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      user: req.user.id,
      createdAt: { $gte: monday, $lte: sunday },
    });

    const summary = {
      total: tasks.length,
      completed: tasks.filter((t) => t.status === "completed").length,
      pending: tasks.filter((t) => t.status === "pending").length,
      inProgress: tasks.filter((t) => t.status === "in-progress").length,
    };

    res.json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ============================================
// DASHBOARD OVERVIEW
// ============================================
// @route GET /api/analytics/dashboard
export const getDashboardOverview = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayTasks = await Task.find({
      user: req.user.id,
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const completed = todayTasks.filter((t) => t.status === "completed").length;

    res.json({
      success: true,
      data: {
        totalTasks: todayTasks.length,
        completedTasks: completed,
        pendingTasks: todayTasks.filter((t) => t.status === "pending").length,
        inProgressTasks: todayTasks.filter((t) => t.status === "in-progress").length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ============================================
// PRODUCTIVITY PATTERNS
// ============================================
// @route GET /api/analytics/patterns
// Returns: weekly day-by-day breakdown + best hour of day
export const getProductivityPatterns = async (req, res) => {
  try {
    // Fetch last 30 days of completed tasks
    const since = new Date();
    since.setDate(since.getDate() - 30);

    const tasks = await Task.find({
      user: req.user.id,
      status: "completed",
      completedAt: { $gte: since },
    });

    // ── Weekly pattern (Mon–Sun) ──────────────────────────
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Count completed tasks per weekday
    const completedPerDay = Array(7).fill(0);
    tasks.forEach((task) => {
      const day = new Date(task.completedAt).getDay(); // 0 = Sun
      completedPerDay[day]++;
    });

    // Count ALL tasks created per weekday (for "total" bar)
    const allTasks = await Task.find({
      user: req.user.id,
      createdAt: { $gte: since },
    });

    const totalPerDay = Array(7).fill(0);
    allTasks.forEach((task) => {
      const day = new Date(task.createdAt).getDay();
      totalPerDay[day]++;
    });

    // Build weeklyData array starting Monday
    const weeklyData = [1, 2, 3, 4, 5, 6, 0].map((dayIndex) => ({
      day: dayNames[dayIndex],
      completed: completedPerDay[dayIndex],
      total: totalPerDay[dayIndex],
    }));

    // ── Hourly pattern (0–23) ─────────────────────────────
    const completedPerHour = Array(24).fill(0);
    tasks.forEach((task) => {
      const hour = new Date(task.completedAt).getHours();
      completedPerHour[hour]++;
    });

    const hourlyData = completedPerHour.map((count, hour) => ({
      hour: `${hour.toString().padStart(2, "0")}:00`,
      completed: count,
    }));

    // ── Best day & best hour ──────────────────────────────
    const bestDayIndex = completedPerDay.indexOf(Math.max(...completedPerDay));
    const bestHourIndex = completedPerHour.indexOf(Math.max(...completedPerHour));

    res.json({
      success: true,
      data: {
        weeklyData,
        hourlyData,
        bestDay: dayNames[bestDayIndex] || null,
        bestHour: bestHourIndex !== -1 ? `${bestHourIndex}:00` : null,
        totalAnalyzed: tasks.length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ============================================
// SMART INSIGHTS
// ============================================
// @route GET /api/analytics/insights
// Returns: array of { title, message, type } insight objects
export const getSmartInsights = async (req, res) => {
  try {
    const insights = [];

    const now = new Date();

    // ── Date helpers ──────────────────────────────────────
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfWeek.getDate() - 7);

    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);

    // ── Fetch data ────────────────────────────────────────
    const [thisWeekTasks, lastWeekTasks, last30Tasks, overdueTasks] =
      await Promise.all([
        Task.find({ user: req.user.id, createdAt: { $gte: startOfWeek } }),
        Task.find({
          user: req.user.id,
          createdAt: { $gte: startOfLastWeek, $lt: startOfWeek },
        }),
        Task.find({ user: req.user.id, createdAt: { $gte: thirtyDaysAgo } }),
        Task.find({
          user: req.user.id,
          status: { $ne: "completed" },
          dueDate: { $lt: now },
        }),
      ]);

    const thisWeekCompleted = thisWeekTasks.filter(
      (t) => t.status === "completed"
    ).length;
    const lastWeekCompleted = lastWeekTasks.filter(
      (t) => t.status === "completed"
    ).length;

    // ── Insight 1: Week-over-week comparison ──────────────
    if (lastWeekCompleted > 0) {
      const diff = thisWeekCompleted - lastWeekCompleted;
      const pct = Math.round((Math.abs(diff) / lastWeekCompleted) * 100);

      if (diff > 0) {
        insights.push({
          type: "positive",
          title: "📈 Great Progress This Week!",
          message: `You've completed ${pct}% more tasks than last week. Keep up the momentum!`,
        });
      } else if (diff < 0) {
        insights.push({
          type: "warning",
          title: "📉 Slower Week Than Usual",
          message: `You completed ${pct}% fewer tasks than last week. A small push today can turn it around!`,
        });
      } else {
        insights.push({
          type: "neutral",
          title: "➡️ Consistent Week",
          message: `You're matching last week's completion rate. Try to push a little further!`,
        });
      }
    } else if (thisWeekCompleted > 0) {
      insights.push({
        type: "positive",
        title: "🚀 Off to a Great Start!",
        message: `You've already completed ${thisWeekCompleted} task${thisWeekCompleted > 1 ? "s" : ""} this week!`,
      });
    }

    // ── Insight 2: Overdue tasks warning ──────────────────
    if (overdueTasks.length > 0) {
      insights.push({
        type: "warning",
        title: `⚠️ ${overdueTasks.length} Overdue Task${overdueTasks.length > 1 ? "s" : ""}`,
        message: `You have ${overdueTasks.length} task${
          overdueTasks.length > 1 ? "s" : ""
        } past their due date. Tackling even one today will help!`,
      });
    }

    // ── Insight 3: Completion rate over 30 days ───────────
    const total30 = last30Tasks.length;
    const completed30 = last30Tasks.filter(
      (t) => t.status === "completed"
    ).length;

    if (total30 > 0) {
      const rate = Math.round((completed30 / total30) * 100);

      if (rate >= 80) {
        insights.push({
          type: "positive",
          title: "🏆 Excellent Completion Rate!",
          message: `You've completed ${rate}% of your tasks in the last 30 days. You're crushing it!`,
        });
      } else if (rate >= 50) {
        insights.push({
          type: "neutral",
          title: "💪 Solid Completion Rate",
          message: `You're completing ${rate}% of your tasks. Try breaking big tasks into smaller steps to push this higher.`,
        });
      } else {
        insights.push({
          type: "warning",
          title: "🎯 Room to Improve",
          message: `Your 30-day completion rate is ${rate}%. Consider setting fewer, more focused tasks each day.`,
        });
      }
    }

    // ── Insight 4: Best productivity day ─────────────────
    const completedLast30 = last30Tasks.filter((t) => t.status === "completed");
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayCount = Array(7).fill(0);

    completedLast30.forEach((task) => {
      const day = new Date(task.completedAt || task.updatedAt).getDay();
      dayCount[day]++;
    });

    const maxDayCount = Math.max(...dayCount);
    if (maxDayCount > 0) {
      const bestDay = dayNames[dayCount.indexOf(maxDayCount)];
      insights.push({
        type: "info",
        title: `📅 Your Most Productive Day`,
        message: `You tend to complete the most tasks on ${bestDay}s. Try scheduling your hardest tasks on that day!`,
      });
    }

    // ── Insight 5: Today's check-in ───────────────────────
    const todayTasks = await Task.find({
      user: req.user.id,
      createdAt: { $gte: startOfToday },
    });

    if (todayTasks.length === 0) {
      insights.push({
        type: "info",
        title: "🌅 Start Your Day",
        message: "You haven't added any tasks today. Start small — even one task sets the tone!",
      });
    } else {
      const todayDone = todayTasks.filter((t) => t.status === "completed").length;
      if (todayDone === todayTasks.length) {
        insights.push({
          type: "positive",
          title: "✅ Today's Tasks Done!",
          message: `You've completed all ${todayDone} task${todayDone > 1 ? "s" : ""} for today. Amazing work!`,
        });
      }
    }

    res.json({
      success: true,
      data: insights,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};