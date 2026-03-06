// // import { useState } from 'react';
// // import { useReflection } from '../../context/ReflectionContext';
// // import { format } from 'date-fns';
// // import { FiEdit2, FiTrash2, FiCalendar, FiChevronDown, FiChevronUp } from 'react-icons/fi';

// // const ReflectionTimeline = ({ onEdit }) => {
// //   const { reflections, deleteReflection, loading } = useReflection();
// //   const [expandedId, setExpandedId] = useState(null);

// //   const toggleExpand = (id) => {
// //     setExpandedId(expandedId === id ? null : id);
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this reflection?')) {
// //       await deleteReflection(id);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center py-12">
// //         <div className="w-8 h-8 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 rounded-full animate-spin"></div>
// //       </div>
// //     );
// //   }

// //   if (reflections.length === 0) {
// //     return (
// //       <div className="text-center py-12">
// //         <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
// //           <FiCalendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
// //         </div>
// //         <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
// //           No reflections yet
// //         </h3>
// //         <p className="text-gray-600 dark:text-gray-400">
// //           Start your weekly reflection journey today!
// //         </p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-4">
// //       {reflections.map((reflection, index) => {
// //         const isExpanded = expandedId === reflection._id;
// //         const weekStart = new Date(reflection.weekStartDate);
// //         const weekEnd = new Date(reflection.weekEndDate);

// //         return (
// //           <div
// //             key={reflection._id}
// //             className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
// //           >
// //             {/* Header */}
// //             <div
// //               className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
// //               onClick={() => toggleExpand(reflection._id)}
// //             >
// //               <div className="flex items-start justify-between">
// //                 <div className="flex items-start gap-4 flex-1">
// //                   {/* Timeline dot */}
// //                   <div className="relative">
// //                     <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
// //                       <FiCalendar className="w-6 h-6 text-white" />
// //                     </div>
// //                     {index !== reflections.length - 1 && (
// //                       <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-purple-300 to-transparent dark:from-purple-700"></div>
// //                     )}
// //                   </div>

// //                   {/* Content */}
// //                   <div className="flex-1">
// //                     <div className="flex items-center gap-2 mb-1">
// //                       <h3 className="text-lg font-bold text-gray-900 dark:text-white">
// //                         Week of {format(weekStart, 'MMM dd')} - {format(weekEnd, 'MMM dd, yyyy')}
// //                       </h3>
// //                     </div>
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">
// //                       Created {format(new Date(reflection.createdAt), 'MMM dd, yyyy')}
// //                     </p>

// //                     {/* Preview */}
// //                     {!isExpanded && reflection.wins && (
// //                       <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
// //                         🎯 {reflection.wins}
// //                       </p>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Actions */}
// //                 <div className="flex items-center gap-2 ml-4">
// //                   <button
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                       onEdit(reflection);
// //                     }}
// //                     className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
// //                   >
// //                     <FiEdit2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
// //                   </button>
// //                   <button
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                       handleDelete(reflection._id);
// //                     }}
// //                     className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
// //                   >
// //                     <FiTrash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
// //                   </button>
// //                   <button className="p-2">
// //                     {isExpanded ? (
// //                       <FiChevronUp className="w-5 h-5 text-gray-500" />
// //                     ) : (
// //                       <FiChevronDown className="w-5 h-5 text-gray-500" />
// //                     )}
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Expanded Content */}
// //             {isExpanded && (
// //               <div className="px-6 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
// //                 {reflection.wins && (
// //                   <div>
// //                     <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
// //                       🎯 Wins
// //                     </h4>
// //                     <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
// //                       {reflection.wins}
// //                     </p>
// //                   </div>
// //                 )}

// //                 {reflection.challenges && (
// //                   <div>
// //                     <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
// //                       💪 Challenges
// //                     </h4>
// //                     <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
// //                       {reflection.challenges}
// //                     </p>
// //                   </div>
// //                 )}

// //                 {reflection.learnings && (
// //                   <div>
// //                     <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
// //                       📚 Learnings
// //                     </h4>
// //                     <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
// //                       {reflection.learnings}
// //                     </p>
// //                   </div>
// //                 )}

// //                 {reflection.improvements && (
// //                   <div>
// //                     <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
// //                       ⚡ Improvements
// //                     </h4>
// //                     <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
// //                       {reflection.improvements}
// //                     </p>
// //                   </div>
// //                 )}

// //                 {reflection.gratitude && (
// //                   <div>
// //                     <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
// //                       🙏 Gratitude
// //                     </h4>
// //                     <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
// //                       {reflection.gratitude}
// //                     </p>
// //                   </div>
// //                 )}

// //                 {reflection.nextWeekGoals && (
// //                   <div>
// //                     <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
// //                       🚀 Next Week Goals
// //                     </h4>
// //                     <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
// //                       {reflection.nextWeekGoals}
// //                     </p>
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // export default ReflectionTimeline;







// import { useState } from 'react';
// import { useReflection } from '../../context/ReflectionContext';
// import { format } from 'date-fns';
// import { FiEdit2, FiTrash2, FiCalendar, FiChevronDown, FiChevronUp, FiStar } from 'react-icons/fi';

// const ReflectionTimeline = ({ onEdit }) => {
//   const { reflections, deleteReflection, loading } = useReflection();
//   const [expandedId, setExpandedId] = useState(null);

//   const toggleExpand = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Delete this reflection?')) {
//       await deleteReflection(id);
//     }
//   };

//   const getTypeColor = (type) => {
//     const colors = {
//       daily: 'from-blue-500 to-cyan-600',
//       weekly: 'from-purple-500 to-pink-600',
//       monthly: 'from-orange-500 to-red-600',
//       yearly: 'from-green-500 to-emerald-600',
//     };
//     return colors[type] || colors.daily;
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center py-12">
//         <div className="w-8 h-8 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (reflections.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <FiCalendar className="w-16 h-16 text-purple-400 dark:text-purple-500 mx-auto mb-4" />
//         <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
//           No reflections yet
//         </h3>
//         <p className="text-gray-600 dark:text-gray-400">
//           Start your reflection journey today!
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {reflections.map((reflection, index) => {
//         const isExpanded = expandedId === reflection._id;

//         return (
//           <div
//             key={reflection._id}
//             className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
//           >
//             {/* Header */}
//             <div
//               className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
//               onClick={() => toggleExpand(reflection._id)}
//             >
//               <div className="flex items-start justify-between">
//                 <div className="flex items-start gap-4 flex-1">
//                   {/* Icon */}
//                   <div className="relative">
//                     <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(reflection.type)} rounded-full flex items-center justify-center`}>
//                       <FiCalendar className="w-6 h-6 text-white" />
//                     </div>
//                     {index !== reflections.length - 1 && (
//                       <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-purple-300 to-transparent dark:from-purple-700"></div>
//                     )}
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-1">
//                       <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize">
//                         {reflection.type} Reflection
//                       </h3>
//                       <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
//                         reflection.type === 'daily' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
//                         reflection.type === 'weekly' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
//                         reflection.type === 'monthly' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
//                         'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
//                       }`}>
//                         {reflection.type}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
//                       <span>{format(new Date(reflection.date), 'MMM dd, yyyy')}</span>
//                       <div className="flex items-center gap-1">
//                         <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                         <span className="font-medium">{reflection.rating}/10</span>
//                       </div>
//                     </div>

//                     {!isExpanded && reflection.wins && (
//                       <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
//                         {reflection.wins}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center gap-2 ml-4">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       onEdit(reflection);
//                     }}
//                     className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
//                   >
//                     <FiEdit2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
//                   </button>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDelete(reflection._id);
//                     }}
//                     className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
//                   >
//                     <FiTrash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
//                   </button>
//                   <button className="p-2">
//                     {isExpanded ? (
//                       <FiChevronUp className="w-5 h-5 text-gray-500" />
//                     ) : (
//                       <FiChevronDown className="w-5 h-5 text-gray-500" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Expanded Content */}
//             {isExpanded && (
//               <div className="px-6 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
//                 {reflection.wins && (
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">🎯 Wins</h4>
//                     <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{reflection.wins}</p>
//                   </div>
//                 )}
//                 {reflection.challenges && (
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">💪 Challenges</h4>
//                     <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{reflection.challenges}</p>
//                   </div>
//                 )}
//                 {reflection.learnings && (
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">📚 Learnings</h4>
//                     <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{reflection.learnings}</p>
//                   </div>
//                 )}
//                 {reflection.improvements && (
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">⚡ Improvements</h4>
//                     <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{reflection.improvements}</p>
//                   </div>
//                 )}
//                 {reflection.gratitude && (
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">🙏 Gratitude</h4>
//                     <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{reflection.gratitude}</p>
//                   </div>
//                 )}
//                 {reflection.nextGoals && (
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">🚀 Next Goals</h4>
//                     <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{reflection.nextGoals}</p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ReflectionTimeline;






import { useState } from 'react';
import { useReflection } from '../../context/ReflectionContext';
import { format } from 'date-fns';
import { FiEdit2, FiTrash2, FiCalendar, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ReflectionTimeline = ({ onEdit }) => {
  const { reflections, deleteReflection, loading } = useReflection();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this reflection?')) {
      await deleteReflection(id);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (reflections.length === 0) {
    return (
      <div className="text-center py-12">
        <FiCalendar className="w-16 h-16 text-purple-400 dark:text-purple-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
          No reflections yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Start your reflection journey today!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reflections.map((reflection, index) => {
        const isExpanded = expandedId === reflection._id;

        return (
          <div
            key={reflection._id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div
              className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              onClick={() => toggleExpand(reflection._id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <FiCalendar className="w-6 h-6 text-white" />
                    </div>
                    {index !== reflections.length - 1 && (
                      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-purple-300 to-transparent dark:from-purple-700"></div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Week of {format(new Date(reflection.weekStartDate), 'MMM dd')} - {format(new Date(reflection.weekEndDate), 'MMM dd, yyyy')}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Rating: {reflection.weekRating}/10
                    </p>

                    {!isExpanded && reflection.wins?.length > 0 && (
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                        🎯 {reflection.wins[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(reflection);
                    }}
                    className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg"
                  >
                    <FiEdit2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(reflection._id);
                    }}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                  >
                    <FiTrash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </button>
                  <button className="p-2">
                    {isExpanded ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {isExpanded && (
              <div className="px-6 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                {reflection.wins?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">🎯 Wins</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {reflection.wins.map((win, i) => (
                        <li key={i} className="text-gray-700 dark:text-gray-300">{win}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {reflection.challenges?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">💪 Challenges</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {reflection.challenges.map((challenge, i) => (
                        <li key={i} className="text-gray-700 dark:text-gray-300">{challenge}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {reflection.lessons?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">📚 Lessons</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {reflection.lessons.map((lesson, i) => (
                        <li key={i} className="text-gray-700 dark:text-gray-300">{lesson}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {reflection.gratitude?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">🙏 Gratitude</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {reflection.gratitude.map((item, i) => (
                        <li key={i} className="text-gray-700 dark:text-gray-300">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {reflection.nextWeekIntentions?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">🚀 Next Week Intentions</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {reflection.nextWeekIntentions.map((intention, i) => (
                        <li key={i} className="text-gray-700 dark:text-gray-300">{intention}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {reflection.overallReflection && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">💭 Overall Reflection</h4>
                    <p className="text-gray-700 dark:text-gray-300">{reflection.overallReflection}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReflectionTimeline;