import { useTask } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import { FiInbox, FiCheckSquare } from 'react-icons/fi';

// const TaskList = () => {
//   const { tasks, loading } = useTask();

//   if (loading) {
//     return (
//       <div className="flex justify-center py-12">
//         <div className="w-8 h-8 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (tasks.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <FiInbox className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
//         <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No tasks yet</h3>
//         <p className="text-gray-600 dark:text-gray-400">Create your first task to get started!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-3">
//       {tasks.map(task => (
//         <TaskItem key={task._id} task={task} />
//       ))}
//     </div>
//   );
// };
const TaskList = () => {
  const { tasks, loading } = useTask();

  // Sort tasks by due date (newest first)
  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(a.dueDate || a.createdAt);
    const dateB = new Date(b.dueDate || b.createdAt);
    return dateB - dateA; // Newest first
  });

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (sortedTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <FiCheckSquare className="w-16 h-16 text-blue-400 dark:text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
          No tasks found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Create your first task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedTasks.map(task => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;