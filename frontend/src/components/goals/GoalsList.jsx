import { useGoal } from '../../context/GoalContext';
import GoalCard from './GoalCard';
import { FiTarget } from 'react-icons/fi';

const GoalsList = () => {
  const { goals, loading } = useGoal();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiTarget className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
          No goals yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Set your first goal to start tracking progress!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {goals.map((goal) => (
        <GoalCard key={goal._id} goal={goal} />
      ))}
    </div>
  );
};

export default GoalsList;