// // const Dashboard = () => {
// //   return (
// //     <div className="min-h-screen bg-gray-50 p-8">
// //       <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {['Total Tasks', 'Active Goals', 'Skills', 'Current Streak'].map((label) => (
// //           <div key={label} className="bg-white rounded-xl shadow-md p-6">
// //             <p className="text-gray-600 text-sm">{label}</p>
// //             <p className="text-3xl font-bold mt-2">0</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;





// // import { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { 
// //   FiCheckSquare, 
// //   FiTarget, 
// //   FiBook, 
// //   FiTrendingUp,
// //   FiPlus,
// //   FiActivity,
// //   FiClock
// // } from 'react-icons/fi';
// // import api from '../../utils/api';

// // const Dashboard = () => {
// //   const [stats, setStats] = useState({
// //     totalTasks: 0,
// //     completedTasks: 0,
// //     activeGoals: 0,
// //     totalSkills: 0,
// //     currentStreak: 0,
// //   });
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchDashboardData();
// //   }, []);

// //   const fetchDashboardData = async () => {
// //     try {
// //       setLoading(true);
// //       // You can uncomment these when your backend endpoints are ready
// //       // const { data } = await api.get('/analytics/dashboard');
// //       // setStats(data.data);
      
// //       // For now, using mock data
// //       setStats({
// //         totalTasks: 24,
// //         completedTasks: 18,
// //         activeGoals: 5,
// //         totalSkills: 8,
// //         currentStreak: 7,
// //       });
// //     } catch (error) {
// //       console.error('Error fetching dashboard data:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const statCards = [
// //     {
// //       title: 'Total Tasks',
// //       value: stats.totalTasks,
// //       subtitle: `${stats.completedTasks} completed`,
// //       icon: FiCheckSquare,
// //       color: 'blue',
// //       link: '/app/tasks',
// //     },
// //     {
// //       title: 'Active Goals',
// //       value: stats.activeGoals,
// //       subtitle: 'In progress',
// //       icon: FiTarget,
// //       color: 'purple',
// //       link: '/app/goals',
// //     },
// //     {
// //       title: 'Skills',
// //       value: stats.totalSkills,
// //       subtitle: 'Learning',
// //       icon: FiBook,
// //       color: 'green',
// //       link: '/app/skills',
// //     },
// //     {
// //       title: 'Current Streak',
// //       value: `${stats.currentStreak} days`,
// //       subtitle: 'Keep it up! 🔥',
// //       icon: FiTrendingUp,
// //       color: 'orange',
// //       link: '/app/analytics',
// //     },
// //   ];

// //   const quickActions = [
// //     {
// //       title: 'Add Task',
// //       description: 'Create a new task',
// //       icon: FiCheckSquare,
// //       color: 'blue',
// //       link: '/app/tasks',
// //     },
// //     {
// //       title: 'Set Goal',
// //       description: 'Define a new goal',
// //       icon: FiTarget,
// //       color: 'purple',
// //       link: '/app/goals',
// //     },
// //     {
// //       title: 'Log Practice',
// //       description: 'Record skill practice',
// //       icon: FiBook,
// //       color: 'green',
// //       link: '/app/skills',
// //     },
// //     {
// //       title: 'View Analytics',
// //       description: 'Check your progress',
// //       icon: FiActivity,
// //       color: 'orange',
// //       link: '/app/analytics',
// //     },
// //   ];

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-96">
// //         <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-8">
// //       {/* Header */}
// //       <div>
// //         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
// //           Welcome back! 👋
// //         </h1>
// //         <p className="text-gray-600 dark:text-gray-400 mt-2">
// //           Here's what's happening with your productivity today.
// //         </p>
// //       </div>

// //       {/* Stats Grid */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {statCards.map((stat, index) => (
// //           <Link
// //             key={index}
// //             to={stat.link}
// //             className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all transform hover:-translate-y-1"
// //           >
// //             <div className="flex items-center justify-between mb-4">
// //               <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
// //                 <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
// //               </div>
// //             </div>
// //             <div>
// //               <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
// //               <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
// //                 {stat.value}
// //               </p>
// //               <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
// //                 {stat.subtitle}
// //               </p>
// //             </div>
// //           </Link>
// //         ))}
// //       </div>

// //       {/* Quick Actions */}
// //       <div>
// //         <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
// //           Quick Actions
// //         </h2>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //           {quickActions.map((action, index) => (
// //             <Link
// //               key={index}
// //               to={action.link}
// //               className="group bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all"
// //             >
// //               <div className={`w-10 h-10 bg-${action.color}-100 dark:bg-${action.color}-900/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
// //                 <action.icon className={`w-5 h-5 text-${action.color}-600 dark:text-${action.color}-400`} />
// //               </div>
// //               <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
// //                 {action.title}
// //               </h3>
// //               <p className="text-sm text-gray-600 dark:text-gray-400">
// //                 {action.description}
// //               </p>
// //             </Link>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Recent Activity */}
// //       <div>
// //         <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
// //           Recent Activity
// //         </h2>
// //         <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
// //           <div className="space-y-4">
// //             {[1, 2, 3].map((_, index) => (
// //               <div key={index} className="flex items-start gap-4">
// //                 <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
// //                 <div className="flex-1">
// //                   <p className="text-sm text-gray-900 dark:text-white font-medium">
// //                     Task completed: "Design new landing page"
// //                   </p>
// //                   <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
// //                     <FiClock className="w-3 h-3" />
// //                     2 hours ago
// //                   </p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;


// // import { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { 
// //   FiCheckSquare, 
// //   FiTarget, 
// //   FiBook, 
// //   FiTrendingUp,
// //   FiPlus,
// //   FiActivity,
// //   FiClock
// // } from 'react-icons/fi';

// // const Dashboard = () => {
// //   const [stats] = useState({
// //     totalTasks: 24,
// //     completedTasks: 18,
// //     activeGoals: 5,
// //     totalSkills: 8,
// //     currentStreak: 7,
// //   });

// //   const statCards = [
// //     {
// //       title: 'Total Tasks',
// //       value: stats.totalTasks,
// //       subtitle: `${stats.completedTasks} completed`,
// //       icon: FiCheckSquare,
// //       color: 'blue',
// //       link: '/app/tasks',
// //     },
// //     {
// //       title: 'Active Goals',
// //       value: stats.activeGoals,
// //       subtitle: 'In progress',
// //       icon: FiTarget,
// //       color: 'purple',
// //       link: '/app/goals',
// //     },
// //     {
// //       title: 'Skills',
// //       value: stats.totalSkills,
// //       subtitle: 'Learning',
// //       icon: FiBook,
// //       color: 'green',
// //       link: '/app/skills',
// //     },
// //     {
// //       title: 'Current Streak',
// //       value: `${stats.currentStreak} days`,
// //       subtitle: 'Keep it up! 🔥',
// //       icon: FiTrendingUp,
// //       color: 'orange',
// //       link: '/app/analytics',
// //     },
// //   ];

// //   const quickActions = [
// //     { title: 'Add Task', description: 'Create a new task', icon: FiCheckSquare, color: 'blue', link: '/app/tasks' },
// //     { title: 'Set Goal', description: 'Define a new goal', icon: FiTarget, color: 'purple', link: '/app/goals' },
// //     { title: 'Log Practice', description: 'Record skill practice', icon: FiBook, color: 'green', link: '/app/skills' },
// //     { title: 'View Analytics', description: 'Check your progress', icon: FiActivity, color: 'orange', link: '/app/analytics' },
// //   ];

// //   return (
// //     <div className="space-y-8">
// //       {/* Header */}
// //       <div>
// //         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
// //           Welcome back! 👋
// //         </h1>
// //         <p className="text-gray-600 dark:text-gray-400 mt-2">
// //           Here's what's happening with your productivity today.
// //         </p>
// //       </div>

// //       {/* Stats Grid */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {statCards.map((stat, index) => (
// //           <Link
// //             key={index}
// //             to={stat.link}
// //             className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all transform hover:-translate-y-1"
// //           >
// //             <div className="flex items-center justify-between mb-4">
// //               <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
// //                 <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
// //               </div>
// //             </div>
// //             <div>
// //               <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
// //               <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
// //                 {stat.value}
// //               </p>
// //               <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
// //                 {stat.subtitle}
// //               </p>
// //             </div>
// //           </Link>
// //         ))}
// //       </div>

// //       {/* Quick Actions */}
// //       <div>
// //         <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
// //           Quick Actions
// //         </h2>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //           {quickActions.map((action, index) => (
// //             <Link
// //               key={index}
// //               to={action.link}
// //               className="group bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all"
// //             >
// //               <div className={`w-10 h-10 bg-${action.color}-100 dark:bg-${action.color}-900/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
// //                 <action.icon className={`w-5 h-5 text-${action.color}-600 dark:text-${action.color}-400`} />
// //               </div>
// //               <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
// //                 {action.title}
// //               </h3>
// //               <p className="text-sm text-gray-600 dark:text-gray-400">
// //                 {action.description}
// //               </p>
// //             </Link>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Recent Activity */}
// //       <div>
// //         <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
// //           Recent Activity
// //         </h2>
// //         <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
// //           <div className="space-y-4">
// //             {[1, 2, 3].map((_, index) => (
// //               <div key={index} className="flex items-start gap-4">
// //                 <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
// //                 <div className="flex-1">
// //                   <p className="text-sm text-gray-900 dark:text-white font-medium">
// //                     Task completed: "Design new landing page"
// //                   </p>
// //                   <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
// //                     <FiClock className="w-3 h-3" />
// //                     2 hours ago
// //                   </p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;










// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   FiCheckSquare, 
//   FiTarget, 
//   FiBook, 
//   FiTrendingUp,
//   FiActivity,
//   FiClock
// } from 'react-icons/fi';
// import api from '../../utils/api';

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     totalTasks: 0,
//     completedTasks: 0,
//     activeGoals: 0,
//     totalSkills: 0,
//     currentStreak: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch analytics dashboard data
//       const { data } = await api.get('/analytics/dashboard');
      
//       // Set stats with fallback to 0 for new users
//       setStats({
//         totalTasks: data.data?.totalTasks || 0,
//         completedTasks: data.data?.completedTasksToday || 0,
//         activeGoals: data.data?.activeGoals || 0,
//         totalSkills: data.data?.activeSkills || 0,
//         currentStreak: data.data?.currentStreak || 0,
//       });
//     } catch (error) {
//       console.error('Error fetching dashboard:', error);
//       // Keep default zeros on error
//       setStats({
//         totalTasks: 0,
//         completedTasks: 0,
//         activeGoals: 0,
//         totalSkills: 0,
//         currentStreak: 0,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statCards = [
//     {
//       title: 'Total Tasks',
//       value: stats.totalTasks,
//       subtitle: `${stats.completedTasks} completed today`,
//       icon: FiCheckSquare,
//       color: 'blue',
//       link: '/app/tasks',
//     },
//     {
//       title: 'Active Goals',
//       value: stats.activeGoals,
//       subtitle: 'In progress',
//       icon: FiTarget,
//       color: 'purple',
//       link: '/app/goals',
//     },
//     {
//       title: 'Skills',
//       value: stats.totalSkills,
//       subtitle: 'Learning',
//       icon: FiBook,
//       color: 'green',
//       link: '/app/skills',
//     },
//     {
//       title: 'Current Streak',
//       value: `${stats.currentStreak}`,
//       subtitle: stats.currentStreak > 0 ? 'Keep it up! 🔥' : 'Start your streak today!',
//       icon: FiTrendingUp,
//       color: 'orange',
//       link: '/app/analytics',
//     },
//   ];

//   const quickActions = [
//     { title: 'Add Task', description: 'Create a new task', icon: FiCheckSquare, color: 'blue', link: '/app/tasks' },
//     { title: 'Set Goal', description: 'Define a new goal', icon: FiTarget, color: 'purple', link: '/app/goals' },
//     { title: 'Log Practice', description: 'Record skill practice', icon: FiBook, color: 'green', link: '/app/skills' },
//     { title: 'View Analytics', description: 'Check your progress', icon: FiActivity, color: 'orange', link: '/app/analytics' },
//   ];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//           Welcome back! 👋
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400 mt-2">
//           {stats.totalTasks === 0 
//             ? "Let's get started on your productivity journey!"
//             : "Here's what's happening with your productivity today."}
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {statCards.map((stat, index) => (
//           <Link
//             key={index}
//             to={stat.link}
//             className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all transform hover:-translate-y-1"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
//                 <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
//               </div>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
//               <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
//                 {stat.value}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
//                 {stat.subtitle}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* Quick Actions */}
//       <div>
//         <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//           Quick Actions
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {quickActions.map((action, index) => (
//             <Link
//               key={index}
//               to={action.link}
//               className="group bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all"
//             >
//               <div className={`w-10 h-10 bg-${action.color}-100 dark:bg-${action.color}-900/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
//                 <action.icon className={`w-5 h-5 text-${action.color}-600 dark:text-${action.color}-400`} />
//               </div>
//               <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
//                 {action.title}
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {action.description}
//               </p>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Recent Activity or Empty State */}
//       <div>
//         <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//           Recent Activity
//         </h2>
//         <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
//           {stats.totalTasks === 0 ? (
//             <div className="text-center py-8">
//               <FiActivity className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
//               <p className="text-gray-600 dark:text-gray-400">
//                 No activity yet. Start by creating your first task!
//               </p>
//               <Link
//                 to="/app/tasks"
//                 className="inline-block mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
//               >
//                 Create Task
//               </Link>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {[1, 2, 3].map((_, index) => (
//                 <div key={index} className="flex items-start gap-4">
//                   <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
//                   <div className="flex-1">
//                     <p className="text-sm text-gray-900 dark:text-white font-medium">
//                       Task completed: "Example task"
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
//                       <FiClock className="w-3 h-3" />
//                       2 hours ago
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiCheckSquare, 
  FiTarget, 
  FiBook, 
  FiTrendingUp,
  FiActivity,
  FiClock,
  FiPlus
} from 'react-icons/fi';
import api from '../../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    activeGoals: 0,
    totalSkills: 0,
    currentStreak: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch tasks
      let tasksData = { totalTasks: 0, completedTasks: 0, pendingTasks: 0 };
      try {
        const tasksRes = await api.get('/tasks');
        const tasks = tasksRes.data.data || [];
        tasksData = {
          totalTasks: tasks.length,
          completedTasks: tasks.filter(t => t.status === 'completed').length,
          pendingTasks: tasks.filter(t => t.status === 'pending').length,
        };
      } catch (error) {
        console.log('Tasks not loaded');
      }

      // Fetch goals
      let goalsData = { activeGoals: 0 };
      try {
        const goalsRes = await api.get('/goals');
        const goals = goalsRes.data.data || [];
        goalsData = {
          activeGoals: goals.filter(g => g.status === 'active').length,
        };
      } catch (error) {
        console.log('Goals not loaded');
      }

      // Fetch skills
      let skillsData = { totalSkills: 0 };
      try {
        const skillsRes = await api.get('/skills');
        const skills = skillsRes.data.data || [];
        skillsData = {
          totalSkills: skills.length,
        };
      } catch (error) {
        console.log('Skills not loaded');
      }

      // Fetch streak
      let streakData = { currentStreak: 0 };
      try {
        const streakRes = await api.get('/analytics/streak');
        streakData = {
          currentStreak: streakRes.data.data?.current || 0,
        };
      } catch (error) {
        console.log('Streak not loaded');
      }

      setStats({
        ...tasksData,
        ...goalsData,
        ...skillsData,
        ...streakData,
      });

    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.totalTasks,
      subtitle: `${stats.completedTasks} completed`,
      icon: FiCheckSquare,
      color: 'blue',
      link: '/app/tasks',
    },
    {
      title: 'Active Goals',
      value: stats.activeGoals,
      subtitle: 'In progress',
      icon: FiTarget,
      color: 'purple',
      link: '/app/goals',
    },
    {
      title: 'Skills',
      value: stats.totalSkills,
      subtitle: 'Learning',
      icon: FiBook,
      color: 'green',
      link: '/app/skills',
    },
    {
      title: 'Current Streak',
      value: `${stats.currentStreak}`,
      subtitle: stats.currentStreak > 0 ? 'Keep it up! 🔥' : 'Start today!',
      icon: FiTrendingUp,
      color: 'orange',
      link: '/app/analytics',
    },
  ];

  const quickActions = [
    { title: 'Add Task', description: 'Create a new task', icon: FiPlus, color: 'blue', link: '/app/tasks' },
    { title: 'Set Goal', description: 'Define a new goal', icon: FiTarget, color: 'purple', link: '/app/goals' },
    { title: 'Log Practice', description: 'Record skill practice', icon: FiBook, color: 'green', link: '/app/skills' },
    { title: 'View Analytics', description: 'Check your progress', icon: FiActivity, color: 'orange', link: '/app/analytics' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  const hasAnyData = stats.totalTasks > 0 || stats.activeGoals > 0 || stats.totalSkills > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {hasAnyData 
            ? "Here's what's happening with your productivity today."
            : "Let's get started on your productivity journey!"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {stat.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all"
            >
              <div className={`w-10 h-10 bg-${action.color}-100 dark:bg-${action.color}-900/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className={`w-5 h-5 text-${action.color}-600 dark:text-${action.color}-400`} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Getting Started / Recent Activity */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {hasAnyData ? 'Recent Activity' : 'Getting Started'}
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          {!hasAnyData ? (
            <div className="text-center py-8">
              <FiActivity className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Welcome to Progressly!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start tracking your productivity journey. Here's what you can do:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <Link
                  to="/app/tasks"
                  className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <FiCheckSquare className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <p className="font-medium text-gray-900 dark:text-white">Create Tasks</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Track daily todos</p>
                </Link>
                <Link
                  to="/app/goals"
                  className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                >
                  <FiTarget className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <p className="font-medium text-gray-900 dark:text-white">Set Goals</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Define objectives</p>
                </Link>
                <Link
                  to="/app/skills"
                  className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                  <FiBook className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <p className="font-medium text-gray-900 dark:text-white">Track Skills</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Log practice</p>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white font-medium">
                    You have {stats.pendingTasks} pending tasks
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                    <FiClock className="w-3 h-3" />
                    Check your tasks page to get started
                  </p>
                </div>
              </div>
              {stats.activeGoals > 0 && (
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                      {stats.activeGoals} active goals in progress
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Keep working towards your objectives!
                    </p>
                  </div>
                </div>
              )}
              {stats.totalSkills > 0 && (
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                      Tracking {stats.totalSkills} skills
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Log your practice sessions to track progress
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;