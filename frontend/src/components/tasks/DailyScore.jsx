// import { useTask } from '../../context/TaskContext';
// import { FiTrendingUp, FiCheckCircle, FiCircle, FiClock } from 'react-icons/fi';

// const DailyScore = () => {
//   const { dailyScore } = useTask();

//   if (!dailyScore) return null;

//   const score = Number(dailyScore?.score) || 0;
//   const maxScore = Number(dailyScore?.maxScore) || 0;

//   const progress = maxScore > 0
//     ? Math.min(100, Math.round((score / maxScore) * 100))
//     : 0;

//   const pending = dailyScore?.pendingTasks || 0;

//   return (
//     <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-blue-100 dark:border-gray-600">
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <h3 className="text-lg font-bold text-gray-900 dark:text-white">Today's Score</h3>
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
//           </p>
//         </div>
//         <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
//           <FiTrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
//         </div>
//       </div>

//       <div className="flex items-end gap-2 mb-4">
//         <span className="text-4xl font-bold text-gray-900 dark:text-white">{dailyScore.score}</span>
//         <span className="text-xl text-gray-500 dark:text-gray-400 mb-1">/ {dailyScore.maxScore}</span>
//         <span className="text-sm text-gray-600 dark:text-gray-400 mb-2 ml-auto">{progress}%</span>
//       </div>

//       <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mb-4">
//         <div
//           className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
//           style={{ width: `${progress}%` }}
//         ></div>
//       </div>

//       <div className="grid grid-cols-3 gap-3">
//         <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
//           <div className="flex items-center gap-2 mb-1">
//             <FiCheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
//             <span className="text-xs text-gray-600 dark:text-gray-400">Completed</span>
//           </div>
//           <p className="text-xl font-bold text-gray-900 dark:text-white">{dailyScore.completedTasks}</p>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
//           <div className="flex items-center gap-2 mb-1">
//             <FiClock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
//             <span className="text-xs text-gray-600 dark:text-gray-400">Pending</span>
//           </div>
//           <p className="text-2xl font-bold text-gray-900 dark:text-white">{pending}</p>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
//           <div className="flex items-center gap-2 mb-1">
//             <FiCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//             <span className="text-xs text-gray-600 dark:text-gray-400">Total</span>
//           </div>
//           <p className="text-xl font-bold text-gray-900 dark:text-white">{dailyScore.totalTasks}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DailyScore;

import { useTask } from '../../context/TaskContext';
import { FiTrendingUp, FiCheckCircle, FiCircle, FiClock } from 'react-icons/fi';

const DailyScore = () => {
  const { dailyScore, loading } = useTask();

  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 animate-pulse">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (!dailyScore) return null;

  // ✅ Safe values
  const score = Number(dailyScore?.score) || 0;
  const maxScore = Number(dailyScore?.maxScore) || 0;
  const completed = Number(dailyScore?.completedTasks) || 0;
  const total = Number(dailyScore?.totalTasks) || 0;

  // ✅ FIXED pending calculation
  const pending = Math.max(0, total - completed);

  // ✅ FIXED progress
  const progress = maxScore > 0
    ? Math.min(100, Math.max(0, Math.round((score / maxScore) * 100)))
    : 0;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-blue-100 dark:border-gray-600">
      
      {/* Header */}
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

      {/* Score */}
      <div className="flex items-end gap-2 mb-4">
        <span className="text-4xl font-bold text-gray-900 dark:text-white">
          {score}
        </span>
        <span className="text-xl text-gray-500 dark:text-gray-400 mb-1">
          / {maxScore}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-400 mb-2 ml-auto">
          {progress}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            minWidth: progress > 0 ? "6px" : "0px"
          }}
        ></div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        
        {/* Completed */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <FiCheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Completed</span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {completed}
          </p>
        </div>

        {/* Pending */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <FiClock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Pending</span>
          </div>
          <p className="text-2xl font-extrabold text-yellow-600 dark:text-yellow-400">
            {pending}
          </p>
        </div>

        {/* Total */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <FiCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Total</span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {total}
          </p>
        </div>

      </div>
    </div>
  );
};

export default DailyScore;