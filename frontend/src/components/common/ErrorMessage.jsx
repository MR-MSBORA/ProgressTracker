import React from 'react';
import { FiAlertCircle, FiRefreshCw, FiX } from 'react-icons/fi';

const ErrorMessage = ({ 
  title = 'Something went wrong', 
  message = 'An error occurred. Please try again.',
  onRetry = null,
  onDismiss = null,
  type = 'error' // error, warning, info
}) => {
  const styles = {
    error: {
      container: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
      icon: 'text-red-600 dark:text-red-400',
      title: 'text-red-900 dark:text-red-100',
      text: 'text-red-700 dark:text-red-300',
      button: 'bg-red-600 hover:bg-red-700 text-white',
    },
    warning: {
      container: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
      icon: 'text-yellow-600 dark:text-yellow-400',
      title: 'text-yellow-900 dark:text-yellow-100',
      text: 'text-yellow-700 dark:text-yellow-300',
      button: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    },
    info: {
      container: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      icon: 'text-blue-600 dark:text-blue-400',
      title: 'text-blue-900 dark:text-blue-100',
      text: 'text-blue-700 dark:text-blue-300',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
  };

  const style = styles[type];

  return (
    <div className={`rounded-lg border p-4 ${style.container} animate-slideIn`}>
      <div className="flex items-start gap-3">
        <FiAlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${style.icon}`} />
        
        <div className="flex-1">
          <h3 className={`font-semibold mb-1 ${style.title}`}>{title}</h3>
          <p className={`text-sm ${style.text}`}>{message}</p>
          
          {onRetry && (
            <button
              onClick={onRetry}
              className={`mt-3 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors ${style.button}`}
            >
              <FiRefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors"
          >
            <FiX className={`w-5 h-5 ${style.icon}`} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;