import { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dailyScore, setDailyScore] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    date: null,
  });

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters.status !== 'all') params.append('status', filters.status);
      if (filters.priority !== 'all') params.append('priority', filters.priority);
      if (filters.date) params.append('date', filters.date);

      const { data } = await api.get(`/tasks?${params.toString()}`);
      setTasks(data.data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  // Fetch daily score
  const fetchDailyScore = async () => {
    try {
      const { data } = await api.get('/tasks/stats/daily');
      setDailyScore(data.data);
    } catch (error) {
      console.error('Error fetching daily score:', error);
    }
  };

  // Create task
  const createTask = async (taskData) => {
    try {
      const { data } = await api.post('/tasks', taskData);
      setTasks((prev) => [data.data, ...prev]);
      toast.success('Task created successfully!');
      fetchDailyScore(); // Refresh score
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create task';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Update task
  const updateTask = async (id, updates) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, updates);
      setTasks((prev) => prev.map((task) => (task._id === id ? data.data : task)));
      toast.success('Task updated successfully!');
      fetchDailyScore();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update task';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Toggle task completion
  const toggleComplete = async (id) => {
    try {
      const { data } = await api.patch(`/tasks/${id}/complete`);
      setTasks((prev) => prev.map((task) => (task._id === id ? data.data : task)));
      toast.success('Task status updated!');
      fetchDailyScore();
      return { success: true };
    } catch (error) {
      toast.error('Failed to update task status');
      return { success: false };
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success('Task deleted successfully!');
      fetchDailyScore();
      return { success: true };
    } catch (error) {
      toast.error('Failed to delete task');
      return { success: false };
    }
  };

  // Load tasks on mount and when filters change
  useEffect(() => {
    fetchTasks();
    fetchDailyScore();
  }, [filters]);

  const value = {
    tasks,
    loading,
    dailyScore,
    filters,
    setFilters,
    createTask,
    updateTask,
    toggleComplete,
    deleteTask,
    refreshTasks: fetchTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};