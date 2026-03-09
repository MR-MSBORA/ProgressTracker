import toast from 'react-hot-toast';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

const defaultOptions = {
  duration: 4000,
  position: 'top-right',
  style: {
    borderRadius: '12px',
    fontSize: '14px',
  },
};

export const showToast = {
  success: (message, options = {}) => {
    toast.success(message, {
      ...defaultOptions,
      ...options,
      icon: <FiCheckCircle className="w-5 h-5" />,
      style: {
        ...defaultOptions.style,
        background: '#10b981',
        color: '#fff',
      },
    });
  },

  error: (message, options = {}) => {
    toast.error(message, {
      ...defaultOptions,
      ...options,
      icon: <FiAlertCircle className="w-5 h-5" />,
      style: {
        ...defaultOptions.style,
        background: '#ef4444',
        color: '#fff',
      },
    });
  },

  info: (message, options = {}) => {
    toast(message, {
      ...defaultOptions,
      ...options,
      icon: <FiInfo className="w-5 h-5" />,
      style: {
        ...defaultOptions.style,
        background: '#3b82f6',
        color: '#fff',
      },
    });
  },

  warning: (message, options = {}) => {
    toast(message, {
      ...defaultOptions,
      ...options,
      icon: <FiAlertTriangle className="w-5 h-5" />,
      style: {
        ...defaultOptions.style,
        background: '#f59e0b',
        color: '#fff',
      },
    });
  },

  loading: (message, options = {}) => {
    return toast.loading(message, {
      ...defaultOptions,
      ...options,
    });
  },

  promise: (promise, messages) => {
    return toast.promise(promise, {
      loading: messages.loading || 'Loading...',
      success: messages.success || 'Success!',
      error: messages.error || 'Error occurred',
    });
  },
};