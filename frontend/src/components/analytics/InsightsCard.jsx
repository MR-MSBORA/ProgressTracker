import { useAnalytics } from '../../context/AnalyticsContext';
import { FiCheckCircle, FiAlertCircle, FiTrendingUp, FiInfo, FiZap } from 'react-icons/fi';

const InsightsCard = () => {
  const { insights } = useAnalytics();

  if (!insights || insights.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Insights</h3>
        <p className="text-gray-600 dark:text-gray-400">No insights available yet. Complete more tasks to see personalized insights!</p>
      </div>
    );
  }

  const getIcon = (type) => {
    const icons = {
      positive: FiCheckCircle,
      improvement: FiAlertCircle,
      motivation: FiZap,
      suggestion: FiTrendingUp,
      info: FiInfo,
    };
    return icons[type] || FiInfo;
  };

  const getColors = (type) => {
    const colors = {
      positive: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-800',
        icon: 'text-green-600 dark:text-green-400',
        text: 'text-green-900 dark:text-green-100',
      },
      improvement: {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        border: 'border-orange-200 dark:border-orange-800',
        icon: 'text-orange-600 dark:text-orange-400',
        text: 'text-orange-900 dark:text-orange-100',
      },
      motivation: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        border: 'border-purple-200 dark:border-purple-800',
        icon: 'text-purple-600 dark:text-purple-400',
        text: 'text-purple-900 dark:text-purple-100',
      },
      suggestion: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        icon: 'text-blue-600 dark:text-blue-400',
        text: 'text-blue-900 dark:text-blue-100',
      },
      info: {
        bg: 'bg-gray-50 dark:bg-gray-900/20',
        border: 'border-gray-200 dark:border-gray-700',
        icon: 'text-gray-600 dark:text-gray-400',
        text: 'text-gray-900 dark:text-gray-100',
      },
    };
    return colors[type] || colors.info;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Personalized Insights</h3>
      
      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = getIcon(insight.type);
          const colors = getColors(insight.type);

          return (
            <div
              key={index}
              className={`${colors.bg} ${colors.border} border rounded-lg p-4`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${colors.icon}`} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${colors.text} mb-1`}>
                    {insight.title}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {insight.message}
                  </p>
                  {insight.category && (
                    <span className={`inline-block text-xs ${colors.icon} font-medium mt-2`}>
                      {insight.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightsCard;