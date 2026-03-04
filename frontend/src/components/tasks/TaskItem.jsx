// import { useState } from 'react';
// import { FiCheck, FiCircle, FiTrash2, FiEdit2, FiClock, FiMoreVertical } from 'react-icons/fi';
// import { useTask } from '../../context/TaskContext';
// import { format } from 'date-fns';

// const TaskItem = ({ task }) => {
//   const { toggleComplete, deleteTask } = useTask();
//   const [showMenu, setShowMenu] = useState(false);

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30';
//       case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30';
//       case 'low': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
//       default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'completed': return 'text-green-600 dark:text-green-400';
//       case 'in-progress': return 'text-blue-600 dark:text-blue-400';
//       default: return 'text-gray-600 dark:text-gray-400';
//     }
//   };

//   const handleToggle = async () => {
//     await toggleComplete(task._id);
//   };

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       await deleteTask(task._id);
//     }
//   };

//   return (
//     <div className={`group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all ${
//       task.status === 'completed' ? 'opacity-75' : ''
//     }`}>
//       <div className="flex items-start gap-3">
//         {/* Checkbox */}
//         <button
//           onClick={handleToggle}
//           className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
//             task.status === 'completed'
//               ? 'bg-green-600 border-green-600'
//               : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
//           }`}
//         >
//           {task.status === 'completed' && <FiCheck className="w-4 h-4 text-white" />}
//         </button>

//         {/* Content */}
//         <div className="flex-1 min-w-0">
//           <h3 className={`font-medium ${
//             task.status === 'completed' 
//               ? 'line-through text-gray-500 dark:text-gray-400' 
//               : 'text-gray-900 dark:text-white'
//           }`}>
//             {task.title}
//           </h3>
          
//           {task.description && (
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//               {task.description}
//             </p>
//           )}

//           {/* Tags */}
//           <div className="flex flex-wrap items-center gap-2 mt-3">
//             {/* Priority Badge */}
//             <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
//               {task.priority}
//             </span>

//             {/* Status Badge */}
//             <span className={`text-xs px-2 py-1 rounded-full font-medium bg-gray-100 dark:bg-gray-700 ${getStatusColor(task.status)}`}>
//               {task.status.replace('-', ' ')}
//             </span>

//             {/* Due Date */}
//             {task.dueDate && (
//               <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
//                 <FiClock className="w-3 h-3" />
//                 {format(new Date(task.dueDate), 'MMM dd')}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="relative flex-shrink-0">
//           <button
//             onClick={() => setShowMenu(!showMenu)}
//             className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors opacity-0 group-hover:opacity-100"
//           >
//             <FiMoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
//           </button>

//           {showMenu && (
//             <>
//               <div 
//                 className="fixed inset-0 z-10" 
//                 onClick={() => setShowMenu(false)}
//               ></div>
//               <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-20">
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     // Add edit functionality here
//                   }}
//                   className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   <FiEdit2 className="w-4 h-4" />
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     handleDelete();
//                   }}
//                   className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
//                 >
//                   <FiTrash2 className="w-4 h-4" />
//                   Delete
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskItem;


import { useState } from 'react';
import { FiCheck, FiTrash2, FiMoreVertical, FiClock } from 'react-icons/fi';
import { useTask } from '../../context/TaskContext';
import { format } from 'date-fns';

const TaskItem = ({ task }) => {
  const { toggleComplete, deleteTask } = useTask();
  const [showMenu, setShowMenu] = useState(false);

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30',
      medium: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30',
      low: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30',
    };
    return colors[priority] || colors.low;
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'text-green-600 dark:text-green-400',
      'in-progress': 'text-blue-600 dark:text-blue-400',
      pending: 'text-gray-600 dark:text-gray-400',
    };
    return colors[status] || colors.pending;
  };

  return (
    <div className={`group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all ${
      task.status === 'completed' ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => toggleComplete(task._id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            task.status === 'completed'
              ? 'bg-green-600 border-green-600'
              : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
          }`}
        >
          {task.status === 'completed' && <FiCheck className="w-4 h-4 text-white" />}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`font-medium ${
            task.status === 'completed' 
              ? 'line-through text-gray-500 dark:text-gray-400' 
              : 'text-gray-900 dark:text-white'
          }`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium bg-gray-100 dark:bg-gray-700 ${getStatusColor(task.status)}`}>
              {task.status.replace('-', ' ')}
            </span>
            {task.dueDate && (
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <FiClock className="w-3 h-3" />
                {format(new Date(task.dueDate), 'MMM dd')}
              </span>
            )}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FiMoreVertical className="w-5 h-5" />
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)}></div>
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-20">
                <button
                  onClick={() => {
                    if (window.confirm('Delete this task?')) deleteTask(task._id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;