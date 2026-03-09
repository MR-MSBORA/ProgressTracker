import React from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger' // danger, warning, info
}) => {
  if (!isOpen) return null;

  const styles = {
    danger: {
      icon: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30',
      button: 'bg-red-600 hover:bg-red-700',
    },
    warning: {
      icon: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30',
      button: 'bg-yellow-600 hover:bg-yellow-700',
    },
    info: {
      icon: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
      button: 'bg-blue-600 hover:bg-blue-700',
    },
  };

  const style = styles[type];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 animate-fadeIn" onClick={onClose}></div>
      
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md animate-scaleIn">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${style.icon}`}>
                <FiAlertTriangle className="w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {message}
                </p>
              </div>

              <button
                onClick={onClose}
                className="flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex gap-3 p-6 pt-0">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors ${style.button}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDialog;