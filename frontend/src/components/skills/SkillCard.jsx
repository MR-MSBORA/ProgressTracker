import { useState } from 'react';
import { FiMoreVertical, FiTrash2, FiClock, FiTrendingUp } from 'react-icons/fi';
import { useSkill } from '../../context/SkillContext';

const SkillCard = ({ skill, onLogPractice }) => {
  const { deleteSkill } = useSkill();
  const [showMenu, setShowMenu] = useState(false);

  const progress = skill.targetHours > 0 
    ? Math.min(Math.round((skill.totalHours / skill.targetHours) * 100), 100)
    : 0;

  const getLevelColor = (level) => {
    const colors = {
      beginner: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
      intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      advanced: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      expert: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    };
    return colors[level] || colors.beginner;
  };

  const getCategoryColor = (category) => {
    const colors = {
      technical: 'from-blue-500 to-cyan-600',
      creative: 'from-purple-500 to-pink-600',
      business: 'from-orange-500 to-red-600',
      language: 'from-green-500 to-emerald-600',
      fitness: 'from-yellow-500 to-orange-600',
      other: 'from-gray-500 to-gray-600',
    };
    return colors[category] || colors.other;
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this skill?')) {
      await deleteSkill(skill._id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(skill.category)} rounded-lg flex items-center justify-center`}>
            <FiTrendingUp className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
              {skill.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {skill.category}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <FiMoreVertical className="w-5 h-5" />
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)}></div>
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-20">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    handleDelete();
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {skill.totalHours || 0}h / {skill.targetHours}h ({progress}%)
          </span>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getCategoryColor(skill.category)} rounded-full transition-all duration-500`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Levels */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Current</p>
          <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getLevelColor(skill.currentLevel)}`}>
            {skill.currentLevel}
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Target</p>
          <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getLevelColor(skill.targetLevel)}`}>
            {skill.targetLevel}
          </span>
        </div>
      </div>

      {/* Description */}
      {skill.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {skill.description}
        </p>
      )}

      {/* Log Practice Button */}
      <button
        onClick={() => onLogPractice(skill)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
      >
        <FiClock className="w-4 h-4" />
        Log Practice
      </button>
    </div>
  );
};

export default SkillCard;