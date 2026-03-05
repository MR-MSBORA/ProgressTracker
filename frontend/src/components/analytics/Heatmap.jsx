import { useAnalytics } from '../../context/AnalyticsContext';
import { format, parseISO } from 'date-fns';

const Heatmap = () => {
  const { heatmap } = useAnalytics();

  if (!heatmap || !heatmap.heatmap) return null;

  const getIntensityColor = (level) => {
    const colors = {
      0: 'bg-gray-100 dark:bg-gray-800',
      1: 'bg-green-200 dark:bg-green-900',
      2: 'bg-green-400 dark:bg-green-700',
      3: 'bg-green-600 dark:bg-green-500',
      4: 'bg-green-800 dark:bg-green-300',
    };
    return colors[level] || colors[0];
  };

  const getTooltipText = (item) => {
    if (item.count === 0) return `${format(parseISO(item.date), 'MMM dd, yyyy')}: No activity`;
    return `${format(parseISO(item.date), 'MMM dd, yyyy')}: ${item.count} tasks completed`;
  };

  // Group by weeks for display
  const weeks = [];
  for (let i = 0; i < heatmap.heatmap.length; i += 7) {
    weeks.push(heatmap.heatmap.slice(i, i + 7));
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Activity Heatmap</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Your productivity over the last year</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600 dark:text-gray-400">Less</span>
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className={`w-4 h-4 rounded ${getIntensityColor(level)}`}
            ></div>
          ))}
          <span className="text-xs text-gray-600 dark:text-gray-400">More</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`w-3 h-3 rounded-sm ${getIntensityColor(day.level)} hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer`}
                  title={getTooltipText(day)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      {heatmap.summary && (
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Days</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{heatmap.summary.totalDays || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Days</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{heatmap.summary.activeDays || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {heatmap.summary.completionRate || 0}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Heatmap;