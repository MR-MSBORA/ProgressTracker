import { useAnalytics } from '../../context/AnalyticsContext';
import { FiZap, FiTrendingUp, FiAward } from 'react-icons/fi';

const StreakCounter = () => {
  const { streak } = useAnalytics();

  if (!streak) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Current Streak */}
      <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-orange-100 text-sm font-medium">Current Streak</p>
            <p className="text-4xl font-bold mt-1">{streak.current}</p>
            <p className="text-orange-100 text-sm mt-1">days</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <FiZap className="w-8 h-8" />
          </div>
        </div>
        {streak.isActive ? (
          <div className="flex items-center gap-2 text-sm bg-white/20 rounded-lg px-3 py-2">
            <FiZap className="w-4 h-4" />
            <span>Active streak! Keep going!</span>
          </div>
        ) : (
          <div className="text-sm text-orange-100">
            Start your streak by completing a task today
          </div>
        )}
      </div>

      {/* Longest Streak */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-purple-100 text-sm font-medium">Longest Streak</p>
            <p className="text-4xl font-bold mt-1">{streak.longest}</p>
            <p className="text-purple-100 text-sm mt-1">days</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <FiAward className="w-8 h-8" />
          </div>
        </div>
        <div className="text-sm text-purple-100">
          {streak.current === streak.longest && streak.current > 0
            ? "You're at your best! 🎉"
            : `${streak.longest - streak.current} days to beat your record`}
        </div>
      </div>

      {/* Consistency Score */}
      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-100 text-sm font-medium">Consistency Score</p>
            <p className="text-4xl font-bold mt-1">{streak.consistency || 0}%</p>
            <p className="text-blue-100 text-sm mt-1">last 30 days</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <FiTrendingUp className="w-8 h-8" />
          </div>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${streak.consistency || 0}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StreakCounter;