import { useAnalytics } from '../../context/AnalyticsContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ProductivityChart = () => {
  const { patterns } = useAnalytics();

  if (!patterns || !patterns.weeklyData) return null;

  const chartData = patterns.weeklyData.map(item => ({
    name: item.day,
    completed: item.completed || 0,
    total: item.total || 0,
    rate: item.completionRate || 0,
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Weekly Productivity</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Task completion by day of week</p>
      </div>

      {/* Bar Chart */}
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis 
              dataKey="name" 
              className="text-gray-600 dark:text-gray-400"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis 
              className="text-gray-600 dark:text-gray-400"
              tick={{ fill: 'currentColor' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--tooltip-bg)',
                border: '1px solid var(--tooltip-border)',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="completed" fill="#3b82f6" name="Completed" radius={[8, 8, 0, 0]} />
            <Bar dataKey="total" fill="#9ca3af" name="Total" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Completion Rate Line Chart */}
      <div>
        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Completion Rate Trend</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis 
              dataKey="name" 
              className="text-gray-600 dark:text-gray-400"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis 
              className="text-gray-600 dark:text-gray-400"
              tick={{ fill: 'currentColor' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--tooltip-bg)',
                border: '1px solid var(--tooltip-border)',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="rate" 
              stroke="#10b981" 
              strokeWidth={3}
              name="Completion Rate (%)"
              dot={{ fill: '#10b981', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Best/Worst Days */}
      {patterns.bestDay && patterns.worstDay && (
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <p className="text-sm text-green-700 dark:text-green-400 font-medium mb-1">Most Productive</p>
            <p className="text-2xl font-bold text-green-900 dark:text-green-300">{patterns.bestDay.day}</p>
            <p className="text-sm text-green-600 dark:text-green-400">{patterns.bestDay.rate}% completion</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <p className="text-sm text-orange-700 dark:text-orange-400 font-medium mb-1">Needs Attention</p>
            <p className="text-2xl font-bold text-orange-900 dark:text-orange-300">{patterns.worstDay.day}</p>
            <p className="text-sm text-orange-600 dark:text-orange-400">{patterns.worstDay.rate}% completion</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductivityChart;