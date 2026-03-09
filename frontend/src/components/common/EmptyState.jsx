import React from 'react';
import { FiInbox } from 'react-icons/fi';

const EmptyState = ({ 
  icon: Icon = FiInbox,
  title = 'No items found',
  description = 'Get started by creating your first item.',
  action = null,
  actionLabel = 'Create New',
  onAction = null,
  className = ''
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-fadeIn">
        <Icon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 animate-slideUp">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto animate-slideUp" style={{ animationDelay: '0.1s' }}>
        {description}
      </p>
      
      {(action || onAction) && (
        <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
          {action || (
            <button
              onClick={onAction}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;