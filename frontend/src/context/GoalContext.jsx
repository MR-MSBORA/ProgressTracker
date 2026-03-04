import { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const GoalContext = createContext();

export const useGoal = () => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error('useGoal must be used within GoalProvider');
  }
  return context;
};

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed, failed

  // Fetch all goals
  const fetchGoals = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter !== 'all') params.append('status', filter);

      const { data } = await api.get(`/goals?${params.toString()}`);
      setGoals(data.data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
      toast.error('Failed to load goals');
    } finally {
      setLoading(false);
    }
  };

  // Fetch goal statistics
  const fetchStats = async () => {
    try {
      const { data } = await api.get('/goals/stats/summary');
      setStats(data.data);
    } catch (error) {
      console.error('Error fetching goal stats:', error);
    }
  };

  // Create goal
  const createGoal = async (goalData) => {
    try {
      const { data } = await api.post('/goals', goalData);
      setGoals((prev) => [data.data, ...prev]);
      toast.success('Goal created successfully!');
      fetchStats();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create goal';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Update goal
  const updateGoal = async (id, updates) => {
    try {
      const { data } = await api.put(`/goals/${id}`, updates);
      setGoals((prev) => prev.map((goal) => (goal._id === id ? data.data : goal)));
      toast.success('Goal updated successfully!');
      fetchStats();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update goal';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Update goal progress
  const updateProgress = async (id, increment) => {
    try {
      const { data } = await api.patch(`/goals/${id}/progress`, { increment });
      setGoals((prev) => prev.map((goal) => (goal._id === id ? data.data : goal)));
      toast.success('Progress updated!');
      fetchStats();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update progress';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Delete goal
  const deleteGoal = async (id) => {
    try {
      await api.delete(`/goals/${id}`);
      setGoals((prev) => prev.filter((goal) => goal._id !== id));
      toast.success('Goal deleted successfully!');
      fetchStats();
      return { success: true };
    } catch (error) {
      toast.error('Failed to delete goal');
      return { success: false };
    }
  };

  useEffect(() => {
    fetchGoals();
    fetchStats();
  }, [filter]);

  const value = {
    goals,
    loading,
    stats,
    filter,
    setFilter,
    createGoal,
    updateGoal,
    updateProgress,
    deleteGoal,
    refreshGoals: fetchGoals,
  };

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
};