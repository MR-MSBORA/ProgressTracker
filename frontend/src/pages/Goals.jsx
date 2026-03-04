// const Goals = () => {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
//         Goals
//       </h1>
//       <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
//         <p className="text-gray-600 dark:text-gray-400">
//           Goals page coming soon...
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Goals;



import { useState } from 'react';
import { FiPlus, FiTarget, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import { GoalProvider, useGoal } from '../context/GoalContext';
import AddGoalForm from '../components/goals/AddGoalForm';
import GoalsList from '../components/goals/GoalsList';

const GoalsContent = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { stats, filter, setFilter } = useGoal();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Goals
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your progress towards achieving your objectives
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
        >
          <FiPlus className="w-5 h-5" />
          Add Goal
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <FiTarget className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalGoals}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Goals</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeGoals}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Goals</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <FiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedGoals}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'active', 'completed', 'failed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
              filter === status
                ? 'bg-purple-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Goals List */}
      <GoalsList />

      {/* Add Goal Modal */}
      <AddGoalForm isOpen={showAddForm} onClose={() => setShowAddForm(false)} />
    </div>
  );
};

const Goals = () => {
  return (
    <GoalProvider>
      <GoalsContent />
    </GoalProvider>
  );
};

export default Goals;