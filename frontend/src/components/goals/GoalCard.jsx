import { useState } from 'react';
import { FiTarget, FiTrendingUp, FiMoreVertical, FiTrash2, FiPlus } from 'react-icons/fi';
import { useGoal } from '../../context/GoalContext';
import { format } from 'date-fns';

const GoalCard = ({ goal }) => {
  const { updateProgress, deleteGoal } = useGoal();
  const [showMenu, setShowMenu] = useState(false);
  const [showProgressForm, setShowProgressForm] = useState(false);
  const [increment, setIncrement] = useState('');

  const progress = goal.progress || 0;
  const progressPercentage = Math.min(Math.round((goal.current / goal.target) * 100), 100);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'active': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'failed': return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  const handleAddProgress = async () => {
    const value = parseInt(increment);
    if (!value || value <= 0) return;

    await updateProgress(goal._id, value);
    setIncrement('');
    setShowProgressForm(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      await deleteGoal(goal._id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FiTarget className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
              {goal.title}
            </h3>
            {goal.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {goal.description}
              </p>
            )}
          </div>
        </div>

        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <FiMoreVertical className="w-5 h-5 text-gray-500" />
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

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {goal.current} / {goal.target} ({progressPercentage}%)
          </span>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(goal.status)}`}>
          {goal.status}
        </span>
        <span className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
          {goal.period}
        </span>
        {goal.endDate && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Due: {format(new Date(goal.endDate), 'MMM dd, yyyy')}
          </span>
        )}
      </div>

      {/* Add Progress Button */}
      {goal.status === 'active' && (
        showProgressForm ? (
          <div className="flex gap-2">
            <input
              type="number"
              value={increment}
              onChange={(e) => setIncrement(e.target.value)}
              placeholder="Add progress..."
              min="1"
              className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleAddProgress}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium"
            >
              Add
            </button>
            <button
              onClick={() => setShowProgressForm(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowProgressForm(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg font-medium transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            Add Progress
          </button>
        )
      )}
    </div>
  );
};

export default GoalCard;