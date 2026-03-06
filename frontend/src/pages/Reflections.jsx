// import { useState } from 'react';
// import { ReflectionProvider, useReflection } from '../context/ReflectionContext';
// import ReflectionForm from '../components/reflections/ReflectionForm';
// import ReflectionTimeline from '../components/reflections/ReflectionTimeline';
// import { FiPlus, FiCalendar, FiAlertCircle } from 'react-icons/fi';

// const ReflectionsContent = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [editReflection, setEditReflection] = useState(null);
//   const { canCreateNew, currentReflection } = useReflection();

//   const handleEdit = (reflection) => {
//     setEditReflection(reflection);
//     setShowForm(true);
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//     setEditReflection(null);
//   };

//   const today = new Date();
//   const isSunday = today.getDay() === 0;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Weekly Reflections
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">
//             Take time to reflect on your progress and learnings
//           </p>
//         </div>

//         <button
//           onClick={() => setShowForm(true)}
//           disabled={!canCreateNew}
//           className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           <FiPlus className="w-5 h-5" />
//           New Reflection
//         </button>
//       </div>

//       {/* Sunday Reminder */}
//       {isSunday && !currentReflection && (
//         <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
//           <div className="flex items-start gap-4">
//             <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
//               <FiCalendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
//             </div>
//             <div className="flex-1">
//               <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-1">
//                 It's Sunday! Time for Weekly Reflection 🌟
//               </h3>
//               <p className="text-purple-700 dark:text-purple-300 mb-4">
//                 Take a moment to reflect on your week. What went well? What did you learn? What can you improve?
//               </p>
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
//               >
//                 Start Reflection
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Info Card */}
//       {!canCreateNew && !isSunday && (
//         <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
//           <div className="flex items-start gap-3">
//             <FiAlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
//             <div>
//               <p className="text-sm text-blue-900 dark:text-blue-100 font-medium mb-1">
//                 You've already completed this week's reflection
//               </p>
//               <p className="text-sm text-blue-700 dark:text-blue-300">
//                 New reflections can be created on Sundays or at the start of each week.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Current Week Reflection */}
//       {currentReflection && (
//         <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h3 className="text-lg font-bold">This Week's Reflection</h3>
//               <p className="text-purple-100 text-sm">Keep up the great work!</p>
//             </div>
//             <button
//               onClick={() => handleEdit(currentReflection)}
//               className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
//             >
//               Edit
//             </button>
//           </div>
//           {currentReflection.wins && (
//             <p className="text-white/90 line-clamp-2">🎯 {currentReflection.wins}</p>
//           )}
//         </div>
//       )}

//       {/* Timeline */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
//         <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
//           Reflection Timeline
//         </h2>
//         <ReflectionTimeline onEdit={handleEdit} />
//       </div>

//       {/* Form Modal */}
//       <ReflectionForm
//         isOpen={showForm}
//         onClose={handleCloseForm}
//         editReflection={editReflection}
//       />
//     </div>
//   );
// };

// const Reflections = () => {
//   return (
//     <ReflectionProvider>
//       <ReflectionsContent />
//     </ReflectionProvider>
//   );
// };

// export default Reflections;






import { useState } from 'react';
import { ReflectionProvider, useReflection } from '../context/ReflectionContext';
import ReflectionForm from '../components/reflections/ReflectionForm';
import ReflectionTimeline from '../components/reflections/ReflectionTimeline';
import { FiPlus, FiFilter } from 'react-icons/fi';

const ReflectionsContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [editReflection, setEditReflection] = useState(null);
  const { filter, setFilter } = useReflection();

  const handleEdit = (reflection) => {
    setEditReflection(reflection);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditReflection(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reflections</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your journey with daily, weekly, monthly, and yearly reflections
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium shadow-lg transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          New Reflection
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-2 mb-3">
          <FiFilter className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900 dark:text-white">Filter by Type</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'daily', 'weekly', 'monthly', 'yearly'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                filter === type
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <ReflectionTimeline onEdit={handleEdit} />
      </div>

      {/* Form Modal */}
      <ReflectionForm
        isOpen={showForm}
        onClose={handleCloseForm}
        editReflection={editReflection}
      />
    </div>
  );
};

const Reflections = () => {
  return (
    <ReflectionProvider>
      <ReflectionsContent />
    </ReflectionProvider>
  );
};

export default Reflections;