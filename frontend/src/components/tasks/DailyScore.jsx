import { useTask } from '../../context/TaskContext';
import { FiTrendingUp, FiCheckCircle, FiCircle, FiClock } from 'react-icons/fi';

const DailyScore = () => {
  const { dailyScore } = useTask();

  if (!dailyScore) return null;

  const progressPercentage = dailyScore.maxScore > 0 
    ? Math.round((dailyScore.score / dailyScore.maxScore) * 100) 
    : 0;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-blue-100 dark:border-gray-600">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Today's Score
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
          <FiTrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      {/* Score Display */}
      <div className="flex items-end gap-2 mb-4">
        <span className="text-4xl font-bold text-gray-900 dark:text-white">
          {dailyScore.score}
        </span>
        <span className="text-xl text-gray-500 dark:text-gray-400 mb-1">
          / {dailyScore.maxScore}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-400 mb-2 ml-auto">
          {progressPercentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <FiCheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Completed</span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {dailyScore.completedTasks}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <FiClock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Pending</span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {dailyScore.pendingTasks}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <FiCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Total</span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {dailyScore.totalTasks}
          </p>
        </div>
      </div>

      {/* Completion Rate */}
      {dailyScore.completionRate > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Completion Rate: <span className="font-bold text-gray-900 dark:text-white">
              {dailyScore.completionRate}%
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DailyScore;