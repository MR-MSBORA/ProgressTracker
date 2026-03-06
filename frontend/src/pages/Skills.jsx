import { useState } from 'react';
import { FiPlus, FiFilter, FiBook, FiClock, FiTrendingUp } from 'react-icons/fi';
import { SkillProvider, useSkill } from '../context/SkillContext';
import AddSkillForm from '../components/skills/AddSkillForm';
import PracticeLogForm from '../components/skills/PracticeLogForm';
import SkillsList from '../components/skills/SkillsList';

const SkillsContent = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPracticeForm, setShowPracticeForm] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const { stats, filters, setFilters } = useSkill();

  const handleLogPractice = (skill) => {
    setSelectedSkill(skill);
    setShowPracticeForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Skills</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your learning and skill development
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-lg transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Add Skill
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <FiBook className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSkills || 0}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Skills</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeSkills || 0}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Skills</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <FiClock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalPracticeHours || 0}h</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Practice Hours</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-2 mb-3">
          <FiFilter className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900 dark:text-white">Filters</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Categories</option>
              <option value="technical">Technical</option>
              <option value="creative">Creative</option>
              <option value="business">Business</option>
              <option value="language">Language</option>
              <option value="fitness">Fitness</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Level
            </label>
            <select
              value={filters.level}
              onChange={(e) => setFilters({ ...filters, level: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>
      </div>

      {/* Skills List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <SkillsList onLogPractice={handleLogPractice} />
      </div>

      {/* Modals */}
      <AddSkillForm isOpen={showAddForm} onClose={() => setShowAddForm(false)} />
      <PracticeLogForm 
        isOpen={showPracticeForm} 
        onClose={() => {
          setShowPracticeForm(false);
          setSelectedSkill(null);
        }}
        skill={selectedSkill}
      />
    </div>
  );
};

const Skills = () => {
  return (
    <SkillProvider>
      <SkillsContent />
    </SkillProvider>
  );
};

export default Skills;