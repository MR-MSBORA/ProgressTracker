import { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AnalyticsContext = createContext();

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) throw new Error('useAnalytics must be used within AnalyticsProvider');
  return context;
};

export const AnalyticsProvider = ({ children }) => {
  const [streak, setStreak] = useState(null);
  const [consistency, setConsistency] = useState(null);
  const [heatmap, setHeatmap] = useState(null);
  const [insights, setInsights] = useState([]);
  const [patterns, setPatterns] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all analytics data
  const fetchAllAnalytics = async () => {
    try {
      setLoading(true);

      const [streakRes, consistencyRes, heatmapRes, insightsRes, patternsRes] = await Promise.all([
        api.get('/analytics/streak'),
        api.get('/analytics/consistency?days=30'),
        api.get('/analytics/heatmap?days=365'),
        api.get('/analytics/insights'),
        api.get('/analytics/patterns'),
      ]);

      setStreak(streakRes.data.data || { current: 0, longest: 0 });
      setConsistency(consistencyRes.data.data || { score: 0 });
      setHeatmap(heatmapRes.data.data || { heatmap: [], summary: {} });
      setInsights(insightsRes.data.data || []);
      setPatterns(patternsRes.data.data || {});
    } catch (error) {
      console.error('Analytics fetch error:', error);
      // Set defaults on error
      setStreak({ current: 0, longest: 0, isActive: false });
      setConsistency({ score: 0 });
      setHeatmap({ heatmap: [], summary: {} });
      setInsights([]);
      setPatterns({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAnalytics();
  }, []);

  return (
    <AnalyticsContext.Provider value={{
      streak,
      consistency,
      heatmap,
      insights,
      patterns,
      loading,
      refresh: fetchAllAnalytics,
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};