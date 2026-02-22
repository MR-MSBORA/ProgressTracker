// Helper functions for analytics calculations

// Calculate date range for current week (Monday to Sunday)
export const getCurrentWeek = () => {
  const today = new Date();
  const day = today.getDay();
  
  // Calculate Monday
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((day + 6) % 7));
  monday.setHours(0, 0, 0, 0);
  
  // Calculate Sunday
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  
  return { startDate: monday, endDate: sunday };
};

// Calculate date range for current month
export const getCurrentMonth = () => {
  const today = new Date();
  
  // First day of month
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
  startDate.setHours(0, 0, 0, 0);
  
  // Last day of month
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  endDate.setHours(23, 59, 59, 999);
  
  return { startDate, endDate };
};

// Calculate date range for last N days
export const getLastNDays = (days) => {
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days + 1);
  startDate.setHours(0, 0, 0, 0);
  
  return { startDate, endDate };
};

// Check if date is today
export const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

// Check if date is yesterday
export const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const checkDate = new Date(date);
  
  return (
    checkDate.getDate() === yesterday.getDate() &&
    checkDate.getMonth() === yesterday.getMonth() &&
    checkDate.getFullYear() === yesterday.getFullYear()
  );
};

// Format date to YYYY-MM-DD
export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Get array of dates between two dates
export const getDateRange = (startDate, endDate) => {
  const dates = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    dates.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

// Calculate percentage
export const calculatePercentage = (part, total) => {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
};

// Group tasks by date
export const groupTasksByDate = (tasks) => {
  const grouped = {};
  
  tasks.forEach(task => {
    const date = formatDate(task.createdAt);
    if (!grouped[date]) {
      grouped[date] = {
        total: 0,
        completed: 0,
        pending: 0,
        inProgress: 0,
        tasks: []
      };
    }
    
    grouped[date].total++;
    if (task.status === 'completed') {
      grouped[date].completed++;
    } else if (task.status === 'pending') {
      grouped[date].pending++;
    } else if (task.status === 'in-progress') {
      grouped[date].inProgress++;
    }
    grouped[date].tasks.push(task);
  });
  
  return grouped;
};

// Calculate days difference
export const daysDifference = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};