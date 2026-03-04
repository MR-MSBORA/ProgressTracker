import { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const SkillContext = createContext();

export const useSkill = () => {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error('useSkill must be used within SkillProvider');
  }
  return context;
};

export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState({ category: 'all', level: 'all' });

  // Fetch all skills
  const fetchSkills = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter.category !== 'all') params.append('category', filter.category);
      if (filter.level !== 'all') params.append('level', filter.level);

      const { data } = await api.get(`/skills?${params.toString()}`);
      setSkills(data.data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  // Fetch skill statistics
  const fetchStats = async () => {
    try {
      const { data } = await api.get('/skills/stats/summary');
      setStats(data.data);
    } catch (error) {
      console.error('Error fetching skill stats:', error);
    }
  };

  // Create skill
  const createSkill = async (skillData) => {
    try {
      const { data } = await api.post('/skills', skillData);
      setSkills((prev) => [data.data, ...prev]);
      toast.success('Skill created successfully!');
      fetchStats();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create skill';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Log practice session
  const logPractice = async (id, practiceData) => {
    try {
      const { data } = await api.post(`/skills/${id}/practice`, practiceData);
      setSkills((prev) => prev.map((skill) => (skill._id === id ? data.data : skill)));
      toast.success('Practice logged successfully!');
      fetchStats();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to log practice';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Update skill
  const updateSkill = async (id, updates) => {
    try {
      const { data } = await api.put(`/skills/${id}`, updates);
      setSkills((prev) => prev.map((skill) => (skill._id === id ? data.data : skill)));
      toast.success('Skill updated successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update skill';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Delete skill
  const deleteSkill = async (id) => {
    try {
      await api.delete(`/skills/${id}`);
      setSkills((prev) => prev.filter((skill) => skill._id !== id));
      toast.success('Skill deleted successfully!');
      fetchStats();
      return { success: true };
    } catch (error) {
      toast.error('Failed to delete skill');
      return { success: false };
    }
  };

  useEffect(() => {
    fetchSkills();
    fetchStats();
  }, [filter]);

  const value = {
    skills,
    loading,
    stats,
    filter,
    setFilter,
    createSkill,
    logPractice,
    updateSkill,
    deleteSkill,
    refreshSkills: fetchSkills,
  };

  return <SkillContext.Provider value={value}>{children}</SkillContext.Provider>;
};