// import { useState, useEffect } from 'react';
// import { FiRefreshCw, FiTrendingUp, FiZap, FiAward } from 'react-icons/fi';
// import api from '../utils/api';
// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// const Analytics = () => {
//   const [loading, setLoading] = useState(true);
//   const [streak, setStreak] = useState({ current: 0, longest: 0, isActive: false });
//   const [heatmapData, setHeatmapData] = useState([]);
//   const [weeklyData, setWeeklyData] = useState([]);
//   const [insights, setInsights] = useState([]);

//   useEffect(() => {
//     fetchAnalytics();
//   }, []);

//   const fetchAnalytics = async () => {
//     try {
//       setLoading(true);

//       // Fetch streak
//       try {
//         const streakRes = await api.get('/analytics/streak');
//         setStreak(streakRes.data.data || { current: 0, longest: 0, isActive: false });
//       } catch (error) {
//         console.log('Streak endpoint not available');
//         setStreak({ current: 0, longest: 0, isActive: false });
//       }

//       // Fetch heatmap
//       try {
//         const heatmapRes = await api.get('/analytics/heatmap?days=90');
//         const heatmap = heatmapRes.data.data?.heatmap || [];
//         setHeatmapData(heatmap.slice(0, 90)); // Last 90 days
//       } catch (error) {
//         console.log('Heatmap endpoint not available');
//         setHeatmapData([]);
//       }

//       // Fetch weekly patterns
//       try {
//         const patternsRes = await api.get('/analytics/patterns');
//         const patterns = patternsRes.data.data?.weeklyData || [];
//         setWeeklyData(patterns);
//       } catch (error) {
//         console.log('Patterns endpoint not available');
//         // Create default weekly data
//         setWeeklyData([
//           { day: 'Mon', completed: 0, total: 0 },
//           { day: 'Tue', completed: 0, total: 0 },
//           { day: 'Wed', completed: 0, total: 0 },
//           { day: 'Thu', completed: 0, total: 0 },
//           { day: 'Fri', completed: 0, total: 0 },
//           { day: 'Sat', completed: 0, total: 0 },
//           { day: 'Sun', completed: 0, total: 0 },
//         ]);
//       }

//       // Fetch insights
//       try {
//         const insightsRes = await api.get('/analytics/insights');
//         setInsights(insightsRes.data.data || []);
//       } catch (error) {
//         console.log('Insights endpoint not available');
//         setInsights([]);
//       }

//     } catch (error) {
//       console.error('Analytics fetch error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">Track your productivity and insights</p>
//         </div>
//         <button
//           onClick={fetchAnalytics}
//           className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
//         >
//           <FiRefreshCw className="w-4 h-4" />
//           Refresh
//         </button>
//       </div>

//       {/* Streak Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <p className="text-orange-100 text-sm font-medium">Current Streak</p>
//               <p className="text-4xl font-bold mt-1">{streak.current}</p>
//               <p className="text-orange-100 text-sm mt-1">days</p>
//             </div>
//             <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
//               <FiZap className="w-8 h-8" />
//             </div>
//           </div>
//           {streak.isActive ? (
//             <div className="flex items-center gap-2 text-sm bg-white/20 rounded-lg px-3 py-2">
//               <FiZap className="w-4 h-4" />
//               <span>Active! Keep going!</span>
//             </div>
//           ) : (
//             <div className="text-sm text-orange-100">
//               Complete a task today to start your streak
//             </div>
//           )}
//         </div>

//         <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <p className="text-purple-100 text-sm font-medium">Longest Streak</p>
//               <p className="text-4xl font-bold mt-1">{streak.longest}</p>
//               <p className="text-purple-100 text-sm mt-1">days</p>
//             </div>
//             <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
//               <FiAward className="w-8 h-8" />
//             </div>
//           </div>
//           <div className="text-sm text-purple-100">
//             {streak.current === streak.longest && streak.current > 0
//               ? "You're at your best! 🎉"
//               : streak.longest > 0
//               ? `${streak.longest - streak.current} days to beat your record`
//               : "Start your journey today!"}
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <p className="text-blue-100 text-sm font-medium">This Week</p>
//               <p className="text-4xl font-bold mt-1">
//                 {weeklyData.reduce((sum, day) => sum + day.completed, 0)}
//               </p>
//               <p className="text-blue-100 text-sm mt-1">tasks completed</p>
//             </div>
//             <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
//               <FiTrendingUp className="w-8 h-8" />
//             </div>
//           </div>
//           <div className="h-2 bg-white/20 rounded-full overflow-hidden">
//             <div 
//               className="h-full bg-white rounded-full"
//               style={{ width: `${Math.min(100, weeklyData.reduce((sum, day) => sum + day.completed, 0) * 10)}%` }}
//             ></div>
//           </div>
//         </div>
//       </div>

//       {/* Activity Heatmap */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
//         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Activity Heatmap</h3>
//         <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Your productivity over the last 90 days</p>
        
//         {heatmapData.length > 0 ? (
//           <div className="overflow-x-auto">
//             <div className="inline-flex flex-wrap gap-1 max-w-full">
//               {heatmapData.map((day, index) => {
//                 const level = day.level || 0;
//                 const colors = [
//                   'bg-gray-100 dark:bg-gray-800',
//                   'bg-green-200 dark:bg-green-900',
//                   'bg-green-400 dark:bg-green-700',
//                   'bg-green-600 dark:bg-green-500',
//                   'bg-green-800 dark:bg-green-300',
//                 ];
                
//                 return (
//                   <div
//                     key={index}
//                     className={`w-3 h-3 rounded-sm ${colors[level]} hover:ring-2 hover:ring-blue-500 cursor-pointer`}
//                     title={`${day.date}: ${day.count || 0} tasks`}
//                   ></div>
//                 );
//               })}
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//             No activity data yet. Complete tasks to see your heatmap!
//           </div>
//         )}
//       </div>

//       {/* Weekly Chart */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
//         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Weekly Productivity</h3>
        
//         {weeklyData.length > 0 && weeklyData.some(d => d.completed > 0 || d.total > 0) ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={weeklyData}>
//               <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
//               <XAxis dataKey="day" className="text-gray-600 dark:text-gray-400" />
//               <YAxis className="text-gray-600 dark:text-gray-400" />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: 'var(--tooltip-bg, #fff)',
//                   border: '1px solid var(--tooltip-border, #e5e7eb)',
//                   borderRadius: '8px',
//                 }}
//               />
//               <Legend />
//               <Bar dataKey="completed" fill="#3b82f6" name="Completed" radius={[8, 8, 0, 0]} />
//               <Bar dataKey="total" fill="#9ca3af" name="Total" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : (
//           <div className="text-center py-12 text-gray-500 dark:text-gray-400">
//             No data yet. Complete tasks throughout the week to see your productivity chart!
//           </div>
//         )}
//       </div>

//       {/* Insights */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
//         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Insights</h3>
        
//         {insights.length > 0 ? (
//           <div className="space-y-3">
//             {insights.map((insight, index) => (
//               <div key={index} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
//                 <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
//                   {insight.title}
//                 </h4>
//                 <p className="text-sm text-blue-700 dark:text-blue-300">
//                   {insight.message}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//             No insights available yet. Complete more tasks to see personalized insights!
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Analytics;


import { useState, useEffect } from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import { FiRefreshCw, FiTrendingUp, FiAward, FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Analytics = () => {
  const { 
    streak, 
    heatmap, 
    insights, 
    patterns,
    fetchStreak,
    fetchHeatmap,
    fetchInsights,
    fetchPatterns,
    loading 
  } = useAnalytics();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStreak();
    fetchHeatmap();
    fetchInsights();
    fetchPatterns();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      fetchStreak(),
      fetchHeatmap(),
      fetchInsights(),
      fetchPatterns(),
    ]);
    toast.success('Analytics refreshed!');
    setRefreshing(false);
  };

  // Generate last 365 days
  const generateHeatmapData = () => {
    const today = new Date();
    const days = [];
    const heatmapMap = {};

    // Create map of existing data
    heatmap?.heatmap?.forEach(item => {
      heatmapMap[item.date] = item.level;
    });

    // Generate 365 days
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      days.push({
        date: dateStr,
        level: heatmapMap[dateStr] || 0,
        day: date.getDay(),
      });
    }

    return days;
  };

  const heatmapData = generateHeatmapData();

  // Group by weeks
  const weeks = [];
  let currentWeek = [];
  
  heatmapData.forEach((day, index) => {
    if (index === 0 && day.day !== 0) {
      // Add empty cells for first week
      for (let i = 0; i < day.day; i++) {
        currentWeek.push({ empty: true });
      }
    }
    
    currentWeek.push(day);
    
    if (day.day === 6 || index === heatmapData.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  const getLevelColor = (level) => {
    const colors = {
      0: 'bg-gray-200 dark:bg-gray-800',
      1: 'bg-green-200 dark:bg-green-900',
      2: 'bg-green-400 dark:bg-green-700',
      3: 'bg-green-600 dark:bg-green-500',
      4: 'bg-green-800 dark:bg-green-400',
    };
    return colors[level] || colors[0];
  };

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your productivity and insights
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
        >
          <FiRefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Streak Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Streak */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Current Streak</h3>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="text-4xl font-bold mb-2">{streak?.current || 0}</div>
          <p className="text-orange-100">days</p>
          {streak?.isActive && (
            <div className="mt-4 px-3 py-2 bg-white/20 rounded-lg text-sm">
              🔥 Active! Keep going!
            </div>
          )}
        </div>

        {/* Longest Streak */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Longest Streak</h3>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <FiAward className="w-6 h-6" />
            </div>
          </div>
          <div className="text-4xl font-bold mb-2">{streak?.longest || 0}</div>
          <p className="text-purple-100">days</p>
          {streak?.current > 0 && streak?.longest - streak?.current > 0 && (
            <div className="mt-4 text-sm text-purple-100">
              {streak.longest - streak.current} days to beat your record
            </div>
          )}
        </div>

        {/* This Week */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">This Week</h3>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <FiCalendar className="w-6 h-6" />
            </div>
          </div>
          <div className="text-4xl font-bold mb-2">{heatmap?.activeDays || 0}</div>
          <p className="text-blue-100">tasks completed</p>
          <div className="mt-4 w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all"
              style={{ width: `${Math.min((heatmap?.activeDays || 0) / 7 * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Activity Heatmap
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Your productivity over the last 90 days
        </p>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Day labels */}
            <div className="flex gap-1 mb-2">
              <div className="w-8"></div>
              <div className="flex-1">
                <div className="grid grid-cols-7 gap-1 text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                </div>
              </div>
            </div>

            {/* Heatmap grid */}
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-3 h-3 rounded-sm ${
                        day.empty 
                          ? 'bg-transparent' 
                          : getLevelColor(day.level)
                      }`}
                      title={day.date ? `${day.date}: ${day.level} tasks` : ''}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-4 text-xs text-gray-600 dark:text-gray-400">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-gray-800"></div>
                <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900"></div>
                <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700"></div>
                <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-500"></div>
                <div className="w-3 h-3 rounded-sm bg-green-800 dark:bg-green-400"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Productivity Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Weekly Productivity
        </h2>
        
        {patterns?.weeklyData && patterns.weeklyData.length > 0 ? (
          <div className="space-y-4">
            {patterns.weeklyData.map((day) => (
              <div key={day.day}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {day.day}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {day.completed} tasks
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${patterns.weeklyData.length > 0 ? (day.completed / Math.max(...patterns.weeklyData.map(d => d.completed))) * 100 : 0}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No data available yet. Complete some tasks to see your patterns!
          </p>
        )}
      </div>

      {/* Insights */}
      {insights && insights.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Smart Insights
          </h2>
          <div className="grid gap-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
              >
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  {insight.title}
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {insight.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;