// import { useState, useEffect } from 'react';
// import { FiX, FiSave, FiCalendar, FiStar } from 'react-icons/fi';
// import { useReflection } from '../../context/ReflectionContext';
// import toast from 'react-hot-toast';

// const ReflectionForm = ({ isOpen, onClose, editReflection = null }) => {
//   const { createReflection, updateReflection } = useReflection();
  
//   const [formData, setFormData] = useState({
//     type: 'daily',
//     date: new Date().toISOString().split('T')[0],
//     rating: 5,
//     wins: '',
//     challenges: '',
//     learnings: '',
//     improvements: '',
//     gratitude: '',
//     nextGoals: '',
//   });
  
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (editReflection) {
//       setFormData({
//         type: editReflection.type || 'daily',
//         date: editReflection.date ? new Date(editReflection.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
//         rating: editReflection.rating || 5,
//         wins: editReflection.wins || '',
//         challenges: editReflection.challenges || '',
//         learnings: editReflection.learnings || '',
//         improvements: editReflection.improvements || '',
//         gratitude: editReflection.gratitude || '',
//         nextGoals: editReflection.nextGoals || '',
//       });
//     }
//   }, [editReflection]);

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({ 
//       ...prev, 
//       [name]: type === 'number' ? parseInt(value) : value 
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate rating
//     if (!formData.rating || formData.rating < 1 || formData.rating > 10) {
//       toast.error('Please rate your week (1-10)');
//       return;
//     }

//     // Validate date
//     if (!formData.date) {
//       toast.error('Please select a date');
//       return;
//     }

//     console.log('Submitting form data:', formData);
    
//     setLoading(true);
    
//     try {
//       let result;
      
//       if (editReflection) {
//         result = await updateReflection(editReflection._id, formData);
//       } else {
//         result = await createReflection(formData);
//       }

//       setLoading(false);

//       if (result.success) {
//         // Reset form
//         setFormData({
//           type: 'daily',
//           date: new Date().toISOString().split('T')[0],
//           rating: 5,
//           wins: '',
//           challenges: '',
//           learnings: '',
//           improvements: '',
//           gratitude: '',
//           nextGoals: '',
//         });
//         onClose();
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error('Submit error:', error);
//       toast.error('Failed to save reflection');
//     }
//   };

//   if (!isOpen) return null;

//   const prompts = {
//     daily: [
//       { name: 'wins', label: '🎯 What went well today?', placeholder: 'Your accomplishments...' },
//       { name: 'challenges', label: '💪 What challenges did you face?', placeholder: 'Obstacles encountered...' },
//       { name: 'learnings', label: '📚 What did you learn?', placeholder: 'New insights...' },
//       { name: 'gratitude', label: '🙏 What are you grateful for?', placeholder: 'Things you appreciate...' },
//       { name: 'nextGoals', label: '🚀 Goals for tomorrow', placeholder: 'What will you focus on...' },
//     ],
//     weekly: [
//       { name: 'wins', label: '🎯 Biggest wins this week?', placeholder: 'Your achievements...' },
//       { name: 'challenges', label: '💪 Challenges faced this week?', placeholder: 'Obstacles...' },
//       { name: 'learnings', label: '📚 What did you learn?', placeholder: 'Insights and growth...' },
//       { name: 'improvements', label: '⚡ What could improve?', placeholder: 'Areas for growth...' },
//       { name: 'gratitude', label: '🙏 Grateful for?', placeholder: 'Count your blessings...' },
//       { name: 'nextGoals', label: '🚀 Goals for next week', placeholder: 'Focus areas...' },
//     ],
//     monthly: [
//       { name: 'wins', label: '🎯 Major accomplishments this month?', placeholder: 'Your wins...' },
//       { name: 'challenges', label: '💪 Biggest challenges?', placeholder: 'What was difficult...' },
//       { name: 'learnings', label: '📚 Key learnings?', placeholder: 'What you discovered...' },
//       { name: 'improvements', label: '⚡ Areas for improvement?', placeholder: 'Growth opportunities...' },
//       { name: 'gratitude', label: '🙏 What are you grateful for?', placeholder: 'Highlights...' },
//       { name: 'nextGoals', label: '🚀 Goals for next month', placeholder: 'Next month focus...' },
//     ],
//     yearly: [
//       { name: 'wins', label: '🎯 Major achievements this year?', placeholder: 'Your biggest wins...' },
//       { name: 'challenges', label: '💪 Biggest challenges overcome?', placeholder: 'Obstacles...' },
//       { name: 'learnings', label: '📚 Most important lessons?', placeholder: 'Key insights...' },
//       { name: 'improvements', label: '⚡ What would you do differently?', placeholder: 'Reflections...' },
//       { name: 'gratitude', label: '🙏 Most grateful for?', placeholder: 'Year highlights...' },
//       { name: 'nextGoals', label: '🚀 Goals for next year', placeholder: 'Vision for next year...' },
//     ],
//   };

//   const currentPrompts = prompts[formData.type] || prompts.daily;

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}></div>
      
//       <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl my-8">
//           {/* Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
//                 <FiCalendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                   {editReflection ? 'Edit Reflection' : 'New Reflection'}
//                 </h2>
//                 <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
//                   {formData.type} reflection
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               type="button"
//               className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//             >
//               <FiX className="w-5 h-5 text-gray-500" />
//             </button>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
//             {/* Type & Date & Rating */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Reflection Type *
//                 </label>
//                 <select
//                   name="type"
//                   value={formData.type}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
//                 >
//                   <option value="daily">Daily</option>
//                   <option value="weekly">Weekly</option>
//                   <option value="monthly">Monthly</option>
//                   <option value="yearly">Yearly</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Date *
//                 </label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Rating (1-10) *
//                 </label>
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="number"
//                     name="rating"
//                     value={formData.rating}
//                     onChange={handleChange}
//                     min="1"
//                     max="10"
//                     required
//                     className="w-20 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
//                   />
//                   <div className="flex gap-0.5">
//                     {[...Array(Math.min(10, Math.max(0, formData.rating)))].map((_, i) => (
//                       <FiStar key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Dynamic Prompts */}
//             {currentPrompts.map((prompt) => (
//               <div key={prompt.name}>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   {prompt.label}
//                 </label>
//                 <textarea
//                   name={prompt.name}
//                   value={formData[prompt.name]}
//                   onChange={handleChange}
//                   rows="3"
//                   placeholder={prompt.placeholder}
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white resize-none"
//                 ></textarea>
//               </div>
//             ))}

//             {/* Submit Buttons */}
//             <div className="flex gap-3 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <FiSave className="w-5 h-5" />
//                     {editReflection ? 'Update' : 'Save'} Reflection
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ReflectionForm;





import { useState, useEffect } from 'react';
import { FiX, FiSave, FiCalendar } from 'react-icons/fi';
import { useReflection } from '../../context/ReflectionContext';
import toast from 'react-hot-toast';

const ReflectionForm = ({ isOpen, onClose, editReflection = null }) => {
  const { createReflection, updateReflection } = useReflection();
  
  const [formData, setFormData] = useState({
    type: 'daily',
    date: new Date().toISOString().split('T')[0],
    rating: 5,
    wins: '',
    challenges: '',
    learnings: '',
    improvements: '',
    gratitude: '',
    nextGoals: '',
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editReflection) {
      setFormData({
        type: editReflection.type || 'daily',
        date: editReflection.date ? new Date(editReflection.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        rating: editReflection.rating || 5,
        wins: editReflection.wins || '',
        challenges: editReflection.challenges || '',
        learnings: editReflection.learnings || '',
        improvements: editReflection.improvements || '',
        gratitude: editReflection.gratitude || '',
        nextGoals: editReflection.nextGoals || '',
      });
    }
  }, [editReflection]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'number' ? parseInt(value) || 1 : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    if (!formData.rating || formData.rating < 1 || formData.rating > 10) {
      toast.error('Please rate between 1-10');
      return;
    }

    if (!formData.date) {
      toast.error('Please select a date');
      return;
    }

    console.log('Submitting:', formData);
    
    setLoading(true);
    
    try {
      let result;
      
      if (editReflection) {
        result = await updateReflection(editReflection._id, formData);
      } else {
        result = await createReflection(formData);
      }

      if (result.success) {
        setFormData({
          type: 'daily',
          date: new Date().toISOString().split('T')[0],
          rating: 5,
          wins: '',
          challenges: '',
          learnings: '',
          improvements: '',
          gratitude: '',
          nextGoals: '',
        });
        onClose();
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Failed to save reflection');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const prompts = {
    daily: [
      { name: 'wins', label: '🎯 What went well today?' },
      { name: 'challenges', label: '💪 What challenges did you face?' },
      { name: 'learnings', label: '📚 What did you learn?' },
      { name: 'gratitude', label: '🙏 What are you grateful for?' },
      { name: 'nextGoals', label: '🚀 Goals for tomorrow' },
    ],
    weekly: [
      { name: 'wins', label: '🎯 Biggest wins this week?' },
      { name: 'challenges', label: '💪 Challenges faced this week?' },
      { name: 'learnings', label: '📚 What did you learn?' },
      { name: 'improvements', label: '⚡ What could improve?' },
      { name: 'gratitude', label: '🙏 Grateful for?' },
      { name: 'nextGoals', label: '🚀 Goals for next week' },
    ],
    monthly: [
      { name: 'wins', label: '🎯 Major accomplishments this month?' },
      { name: 'challenges', label: '💪 Biggest challenges?' },
      { name: 'learnings', label: '📚 Key learnings?' },
      { name: 'improvements', label: '⚡ Areas for improvement?' },
      { name: 'gratitude', label: '🙏 What are you grateful for?' },
      { name: 'nextGoals', label: '🚀 Goals for next month' },
    ],
    yearly: [
      { name: 'wins', label: '🎯 Major achievements this year?' },
      { name: 'challenges', label: '💪 Biggest challenges overcome?' },
      { name: 'learnings', label: '📚 Most important lessons?' },
      { name: 'improvements', label: '⚡ What would you do differently?' },
      { name: 'gratitude', label: '🙏 Most grateful for?' },
      { name: 'nextGoals', label: '🚀 Goals for next year' },
    ],
  };

  const currentPrompts = prompts[formData.type] || prompts.daily;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}></div>
      
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl my-8">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <FiCalendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editReflection ? 'Edit Reflection' : 'New Reflection'}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {formData.type} reflection
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Type & Date & Rating */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rating (1-10) *
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Prompts */}
            {currentPrompts.map((prompt) => (
              <div key={prompt.name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {prompt.label}
                </label>
                <textarea
                  name={prompt.name}
                  value={formData[prompt.name]}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white resize-none"
                ></textarea>
              </div>
            ))}

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave className="w-5 h-5" />
                    Save
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReflectionForm;