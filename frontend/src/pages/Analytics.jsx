import { AnalyticsProvider, useAnalytics } from '../context/AnalyticsContext.jsx';
import StreakCounter from '../components/analytics/StreakCounter';
import Heatmap from '../components/analytics/Heatmap';
import ProductivityChart from '../components/analytics/ProductivityChart';
import InsightsCard from '../components/analytics/InsightsCard';
import { FiRefreshCw } from 'react-icons/fi';

const AnalyticsContent = () => {
  const { loading, refresh } = useAnalytics();

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
          onClick={refresh}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <FiRefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Streak Counter */}
      <StreakCounter />

      {/* Heatmap */}
      <Heatmap />

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductivityChart />
        <InsightsCard />
      </div>
    </div>
  );
};

const Analytics = () => {
  return (
    <AnalyticsProvider>
      <AnalyticsContent />
    </AnalyticsProvider>
  );
};

export default Analytics;