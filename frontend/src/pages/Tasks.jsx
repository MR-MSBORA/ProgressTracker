import { useState } from 'react';
import { FiPlus, FiFilter } from 'react-icons/fi';
import { TaskProvider, useTask } from '../context/TaskContext';
import AddTaskForm from '../components/tasks/AddTaskForm';
import TaskList from '../components/tasks/TaskList';
import DailyScore from '../components/tasks/DailyScore';

const TasksContent = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { filters, setFilters } = useTask();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your daily tasks</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg"
        >
          <FiPlus className="w-5 h-5" />
          Add Task
        </button>
      </div>

      <DailyScore />

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-2 mb-3">
          <FiFilter className="w-5 h-5" />
          <h3 className="font-medium text-gray-900 dark:text-white">Filters</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <TaskList />
      </div>

      <AddTaskForm isOpen={showAddForm} onClose={() => setShowAddForm(false)} />
    </div>
  );
};

const Tasks = () => {
  return (
    <TaskProvider>
      <TasksContent />
    </TaskProvider>
  );
};

export default Tasks;