import { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const SkillContext = createContext();

export const useSkill = () => {
  const context = useContext(SkillContext);
  if (!context) throw new Error('useSkill must be used within SkillProvider');
  return context;
};

export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    level: 'all',
  });

  // Fetch skills
  // const fetchSkills = async () => {
  //   try {
  //     setLoading(true);
  //     const params = new URLSearchParams();
  //     if (filters.category !== 'all') params.append('category', filters.category);
  //     if (filters.level !== 'all') params.append('level', filters.level);

  //     const { data } = await api.get(`/skills?${params.toString()}`);
  //     setSkills(data.data || []);
  //   } catch (error) {
  //     console.error('Fetch skills error:', error);
  //     setSkills([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchSkills = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (filters.category && filters.category !== 'all') {
        params.append('category', filters.category);
      }
      if (filters.level && filters.level !== 'all') {
        params.append('level', filters.level);
      }

      const { data } = await api.get(`/skills?${params.toString()}`);
      setSkills(data.data || []);
    } catch (error) {
      console.error('Fetch skills error:', error);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const { data } = await api.get('/skills/stats/summary');
      setStats(data.data);
    } catch (error) {
      console.error('Fetch stats error:', error);
      setStats({ totalSkills: 0, activeSkills: 0, totalPracticeHours: 0 });
    }
  };

  // Create skill
  const createSkill = async (skillData) => {
    try {
      const { data } = await api.post('/skills', skillData);
      setSkills(prev => [data.data, ...prev]);
      toast.success('Skill created!');
      fetchStats();
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.error || 'Failed to create skill';
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  // Log practice
  const logPractice = async (id, practiceData) => {
    try {
      const { data } = await api.post(`/skills/${id}/practice`, practiceData);
      setSkills(prev => prev.map(skill => skill._id === id ? data.data : skill));
      toast.success('Practice logged!');
      fetchStats();
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.error || 'Failed to log practice';
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  // Update skill
  const updateSkill = async (id, updates) => {
    try {
      const { data } = await api.put(`/skills/${id}`, updates);
      setSkills(prev => prev.map(skill => skill._id === id ? data.data : skill));
      toast.success('Skill updated!');
      return { success: true };
    } catch (error) {
      toast.error('Failed to update skill');
      return { success: false };
    }
  };

  // Delete skill
  const deleteSkill = async (id) => {
    try {
      await api.delete(`/skills/${id}`);
      setSkills(prev => prev.filter(skill => skill._id !== id));
      toast.success('Skill deleted!');
      fetchStats();
    } catch (error) {
      toast.error('Failed to delete skill');
    }
  };

  useEffect(() => {
    fetchSkills();
    fetchStats();
  }, [filters]);

  return (
    <SkillContext.Provider value={{
      skills,
      loading,
      stats,
      filters,
      setFilters,
      createSkill,
      logPractice,
      updateSkill,
      deleteSkill,
      refresh: fetchSkills,
    }}>
      {children}
    </SkillContext.Provider>
  );
};