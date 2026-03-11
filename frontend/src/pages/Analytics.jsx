import { useState, useEffect } from 'react';
import { FiRefreshCw, FiTrendingUp, FiZap, FiAward } from 'react-icons/fi';
import api from '../utils/api';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState({ current: 0, longest: 0, isActive: false });
  const [heatmapData, setHeatmapData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Fetch streak
      try {
        const streakRes = await api.get('/analytics/streak');
        setStreak(streakRes.data.data || { current: 0, longest: 0, isActive: false });
      } catch (error) {
        console.log('Streak endpoint not available');
        setStreak({ current: 0, longest: 0, isActive: false });
      }

      // Fetch heatmap
      try {
        const heatmapRes = await api.get('/analytics/heatmap?days=90');
        const heatmap = heatmapRes.data.data?.heatmap || [];
        setHeatmapData(heatmap.slice(0, 90)); // Last 90 days
      } catch (error) {
        console.log('Heatmap endpoint not available');
        setHeatmapData([]);
      }

      // Fetch weekly patterns
      try {
        const patternsRes = await api.get('/analytics/patterns');
        const patterns = patternsRes.data.data?.weeklyData || [];
        setWeeklyData(patterns);
      } catch (error) {
        console.log('Patterns endpoint not available');
        // Create default weekly data
        setWeeklyData([
          { day: 'Mon', completed: 0, total: 0 },
          { day: 'Tue', completed: 0, total: 0 },
          { day: 'Wed', completed: 0, total: 0 },
          { day: 'Thu', completed: 0, total: 0 },
          { day: 'Fri', completed: 0, total: 0 },
          { day: 'Sat', completed: 0, total: 0 },
          { day: 'Sun', completed: 0, total: 0 },
        ]);
      }

      // Fetch insights
      try {
        const insightsRes = await api.get('/analytics/insights');
        setInsights(insightsRes.data.data || []);
      } catch (error) {
        console.log('Insights endpoint not available');
        setInsights([]);
      }

    } catch (error) {
      console.error('Analytics fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your productivity and insights</p>
        </div>
        <button
          onClick={fetchAnalytics}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <FiRefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Streak Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <span>Active! Keep going!</span>
            </div>
          ) : (
            <div className="text-sm text-orange-100">
              Complete a task today to start your streak
            </div>
          )}
        </div>

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
              : streak.longest > 0
              ? `${streak.longest - streak.current} days to beat your record`
              : "Start your journey today!"}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm font-medium">This Week</p>
              <p className="text-4xl font-bold mt-1">
                {weeklyData.reduce((sum, day) => sum + day.completed, 0)}
              </p>
              <p className="text-blue-100 text-sm mt-1">tasks completed</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <FiTrendingUp className="w-8 h-8" />
            </div>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full"
              style={{ width: `${Math.min(100, weeklyData.reduce((sum, day) => sum + day.completed, 0) * 10)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Activity Heatmap</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Your productivity over the last 90 days</p>
        
        {heatmapData.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="inline-flex flex-wrap gap-1 max-w-full">
              {heatmapData.map((day, index) => {
                const level = day.level || 0;
                const colors = [
                  'bg-gray-100 dark:bg-gray-800',
                  'bg-green-200 dark:bg-green-900',
                  'bg-green-400 dark:bg-green-700',
                  'bg-green-600 dark:bg-green-500',
                  'bg-green-800 dark:bg-green-300',
                ];
                
                return (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-sm ${colors[level]} hover:ring-2 hover:ring-blue-500 cursor-pointer`}
                    title={`${day.date}: ${day.count || 0} tasks`}
                  ></div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No activity data yet. Complete tasks to see your heatmap!
          </div>
        )}
      </div>

      {/* Weekly Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Weekly Productivity</h3>
        
        {weeklyData.length > 0 && weeklyData.some(d => d.completed > 0 || d.total > 0) ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis dataKey="day" className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg, #fff)',
                  border: '1px solid var(--tooltip-border, #e5e7eb)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="completed" fill="#3b82f6" name="Completed" radius={[8, 8, 0, 0]} />
              <Bar dataKey="total" fill="#9ca3af" name="Total" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No data yet. Complete tasks throughout the week to see your productivity chart!
          </div>
        )}
      </div>

      {/* Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Insights</h3>
        
        {insights.length > 0 ? (
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  {insight.title}
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {insight.message}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No insights available yet. Complete more tasks to see personalized insights!
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;