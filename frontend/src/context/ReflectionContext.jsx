// import { createContext, useState, useContext, useEffect } from 'react';
// import api from '../utils/api';
// import toast from 'react-hot-toast';

// const ReflectionContext = createContext();

// export const useReflection = () => {
//   const context = useContext(ReflectionContext);
//   if (!context) throw new Error('useReflection must be used within ReflectionProvider');
//   return context;
// };

// export const ReflectionProvider = ({ children }) => {
//   const [reflections, setReflections] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState('all'); // all, daily, weekly, monthly, yearly

//   // Fetch reflections
//   const fetchReflections = async () => {
//     try {
//       setLoading(true);
//       const params = new URLSearchParams();
//       if (filter !== 'all') params.append('type', filter);

//       const { data } = await api.get(`/reflections?${params.toString()}`);
//       setReflections(data.data || []);
//     } catch (error) {
//       console.error('Fetch reflections error:', error);
//       setReflections([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create reflection
//   const createReflection = async (reflectionData) => {
//     try {
//       const { data } = await api.post('/reflections', reflectionData);
//       setReflections(prev => [data.data, ...prev]);
//       toast.success('Reflection saved successfully!');
//       return { success: true, data: data.data };
//     } catch (error) {
//       const msg = error.response?.data?.error || 'Failed to create reflection';
//       toast.error(msg);
//       console.error('Create reflection error:', error);
//       return { success: false, error: msg };
//     }
//   };

//   // Update reflection
//   const updateReflection = async (id, updates) => {
//     try {
//       const { data } = await api.put(`/reflections/${id}`, updates);
//       setReflections(prev => prev.map(r => r._id === id ? data.data : r));
//       toast.success('Reflection updated!');
//       return { success: true };
//     } catch (error) {
//       toast.error('Failed to update reflection');
//       return { success: false };
//     }
//   };

//   // Delete reflection
//   const deleteReflection = async (id) => {
//     try {
//       await api.delete(`/reflections/${id}`);
//       setReflections(prev => prev.filter(r => r._id !== id));
//       toast.success('Reflection deleted!');
//     } catch (error) {
//       toast.error('Failed to delete reflection');
//     }
//   };

//   useEffect(() => {
//     fetchReflections();
//   }, [filter]);

//   return (
//     <ReflectionContext.Provider value={{
//       reflections,
//       loading,
//       filter,
//       setFilter,
//       createReflection,
//       updateReflection,
//       deleteReflection,
//       refresh: fetchReflections,
//     }}>
//       {children}
//     </ReflectionContext.Provider>
//   );
// };




import { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const ReflectionContext = createContext();

export const useReflection = () => {
  const context = useContext(ReflectionContext);
  if (!context) throw new Error('useReflection must be used within ReflectionProvider');
  return context;
};

export const ReflectionProvider = ({ children }) => {
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const fetchReflections = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/reflections');
      setReflections(data.data || []);
    } catch (error) {
      console.error('Fetch reflections error:', error);
      setReflections([]);
    } finally {
      setLoading(false);
    }
  };

  const createReflection = async (reflectionData) => {
    try {
      // Calculate week dates
      const selectedDate = new Date(reflectionData.date);
      const day = selectedDate.getDay();
      
      const monday = new Date(selectedDate);
      monday.setDate(selectedDate.getDate() - ((day + 6) % 7));
      monday.setHours(0, 0, 0, 0);
      
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);

      // Transform to match backend model (arrays for text fields)
      const payload = {
        weekStartDate: monday.toISOString(),
        weekEndDate: sunday.toISOString(),
        weekRating: reflectionData.rating, // weekRating, not rating
        
        // Backend expects arrays
        wins: reflectionData.wins ? [reflectionData.wins] : [],
        challenges: reflectionData.challenges ? [reflectionData.challenges] : [],
        lessons: reflectionData.learnings ? [reflectionData.learnings] : [], // lessons, not learnings
        gratitude: reflectionData.gratitude ? [reflectionData.gratitude] : [],
        nextWeekIntentions: reflectionData.nextGoals ? [reflectionData.nextGoals] : [],
        
        // Optional fields
        overallReflection: reflectionData.improvements || '',
        mood: 'neutral',
        productivityRating: reflectionData.rating,
        healthRating: reflectionData.rating,
      };

      console.log('Sending to backend:', payload);

      const { data } = await api.post('/reflections', payload);
      
      setReflections(prev => [data.data, ...prev]);
      toast.success('Reflection saved successfully!');
      return { success: true, data: data.data };
    } catch (error) {
      console.error('Create reflection error:', error);
      console.error('Error response:', error.response?.data);
      
      const msg = error.response?.data?.error || 
                  error.response?.data?.message || 
                  'Failed to create reflection';
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const updateReflection = async (id, updates) => {
    try {
      const selectedDate = new Date(updates.date);
      const day = selectedDate.getDay();
      
      const monday = new Date(selectedDate);
      monday.setDate(selectedDate.getDate() - ((day + 6) % 7));
      monday.setHours(0, 0, 0, 0);
      
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);

      const payload = {
        weekStartDate: monday.toISOString(),
        weekEndDate: sunday.toISOString(),
        weekRating: updates.rating,
        wins: updates.wins ? [updates.wins] : [],
        challenges: updates.challenges ? [updates.challenges] : [],
        lessons: updates.learnings ? [updates.learnings] : [],
        gratitude: updates.gratitude ? [updates.gratitude] : [],
        nextWeekIntentions: updates.nextGoals ? [updates.nextGoals] : [],
        overallReflection: updates.improvements || '',
        mood: 'neutral',
        productivityRating: updates.rating,
        healthRating: updates.rating,
      };

      const { data } = await api.put(`/reflections/${id}`, payload);
      setReflections(prev => prev.map(r => r._id === id ? data.data : r));
      toast.success('Reflection updated!');
      return { success: true };
    } catch (error) {
      console.error('Update reflection error:', error);
      toast.error('Failed to update reflection');
      return { success: false };
    }
  };

  const deleteReflection = async (id) => {
    try {
      await api.delete(`/reflections/${id}`);
      setReflections(prev => prev.filter(r => r._id !== id));
      toast.success('Reflection deleted!');
    } catch (error) {
      toast.error('Failed to delete reflection');
    }
  };

  useEffect(() => {
    fetchReflections();
  }, [filter]);

  return (
    <ReflectionContext.Provider value={{
      reflections,
      loading,
      filter,
      setFilter,
      createReflection,
      updateReflection,
      deleteReflection,
      refresh: fetchReflections,
    }}>
      {children}
    </ReflectionContext.Provider>
  );
};