import Skill from "../models/Skill.js";

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private
export const createSkill = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      data: skill,
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

// @desc    Get all skills for user
// @route   GET /api/skills
// @access  Private
export const getSkills = async (req, res) => {
  try {
    let query = { user: req.user.id };

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by level
    if (req.query.level) {
      query.level = req.query.level;
    }

    // Filter by active status
    if (req.query.isActive !== undefined) {
      query.isActive = req.query.isActive === "true";
    }

    const skills = await Skill.find(query).sort("-createdAt");

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Get single skill
// @route   GET /api/skills/:id
// @access  Private
export const getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        error: "Skill not found",
      });
    }

    // Check ownership
    if (skill.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to access this skill",
      });
    }

    res.status(200).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Skill not found",
      });
    }
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
export const updateSkill = async (req, res) => {
  try {
    let skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        error: "Skill not found",
      });
    }

    if (skill.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to update this skill",
      });
    }

    skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: skill,
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

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        error: "Skill not found",
      });
    }

    if (skill.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to delete this skill",
      });
    }

    await skill.deleteOne();

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

// @desc    Log practice session
// @route   POST /api/skills/:id/practice
// @access  Private
export const logPractice = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        error: "Skill not found",
      });
    }

    if (skill.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized",
      });
    }

    const { duration, notes } = req.body;

    if (!duration || duration < 1) {
      return res.status(400).json({
        success: false,
        error: "Please provide valid duration (minimum 1 minute)",
      });
    }

    // Log practice using model method
    skill.logPractice(duration, notes);
    await skill.save();

    res.status(200).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Get practice history for skill
// @route   GET /api/skills/:id/practice
// @access  Private
export const getPracticeHistory = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        error: "Skill not found",
      });
    }

    if (skill.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized",
      });
    }

    // Get limit from query (default 10)
    const limit = parseInt(req.query.limit) || 10;

    // Get recent logs
    const logs = skill.practiceLogs
      .sort((a, b) => b.date - a.date)
      .slice(0, limit);

    res.status(200).json({
      success: true,
      count: logs.length,
      totalSessions: skill.practiceLogs.length,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Get skill statistics
// @route   GET /api/skills/stats/summary
// @access  Private
export const getSkillStats = async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user.id });

    const totalSkills = skills.length;
    const activeSkills = skills.filter((s) => s.isActive).length;

    // Count by level
    const beginnerCount = skills.filter((s) => s.level === "beginner").length;
    const intermediateCount = skills.filter(
      (s) => s.level === "intermediate"
    ).length;
    const advancedCount = skills.filter((s) => s.level === "advanced").length;
    const expertCount = skills.filter((s) => s.level === "expert").length;

    // Count by category
    const categoryBreakdown = {
      programming: skills.filter((s) => s.category === "programming").length,
      language: skills.filter((s) => s.category === "language").length,
      music: skills.filter((s) => s.category === "music").length,
      art: skills.filter((s) => s.category === "art").length,
      sport: skills.filter((s) => s.category === "sport").length,
      business: skills.filter((s) => s.category === "business").length,
      other: skills.filter((s) => s.category === "other").length,
    };

    // Calculate total practice time
    const totalHours = skills.reduce((sum, skill) => sum + skill.totalHours, 0);
    const totalSessions = skills.reduce(
      (sum, skill) => sum + skill.practiceLogs.length,
      0
    );

    // Calculate average progress
    const totalProgress = skills.reduce((sum, skill) => sum + skill.progress, 0);
    const averageProgress =
      totalSkills > 0 ? Math.round(totalProgress / totalSkills) : 0;

    res.status(200).json({
      success: true,
      data: {
        totalSkills,
        activeSkills,
        totalHours: Math.round(totalHours * 10) / 10, // Round to 1 decimal
        totalSessions,
        averageProgress,
        levelBreakdown: {
          beginner: beginnerCount,
          intermediate: intermediateCount,
          advanced: advancedCount,
          expert: expertCount,
        },
        categoryBreakdown,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};