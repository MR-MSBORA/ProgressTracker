// // import { NavLink } from 'react-router-dom';
// // import { 
// //   FiHome, 
// //   FiCheckSquare, 
// //   FiTarget, 
// //   FiBook, 
// //   FiEdit3, 
// //   FiBarChart2,
// //   FiX
// // } from 'react-icons/fi';

// // const Sidebar = ({ isOpen, onClose }) => {
// //   const navigation = [
// //     { name: 'Dashboard', href: '/app/dashboard', icon: FiHome },
// //     { name: 'Tasks', href: '/app/tasks', icon: FiCheckSquare },
// //     { name: 'Goals', href: '/app/goals', icon: FiTarget },
// //     { name: 'Skills', href: '/app/skills', icon: FiBook },
// //     { name: 'Reflections', href: '/app/reflections', icon: FiEdit3 },
// //     { name: 'Analytics', href: '/app/analytics', icon: FiBarChart2 },
// //   ];

// //   return (
// //     <>
// //       {/* Mobile Overlay */}
// //       {isOpen && (
// //         <div
// //           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
// //           onClick={onClose}
// //         />
// //       )}

// //       {/* Sidebar */}
// //       <aside
// //         className={`
// //           fixed top-16 left-0 bottom-0 w-64 
// //           bg-white dark:bg-gray-800 
// //           border-r border-gray-200 dark:border-gray-700 
// //           z-40 transform transition-transform duration-300 ease-in-out
// //           ${isOpen ? 'translate-x-0' : '-translate-x-full'}
// //           lg:translate-x-0
// //         `}
// //       >
// //         {/* Close button (mobile only) */}
// //         <button
// //           onClick={onClose}
// //           className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
// //         >
// //           <FiX className="w-5 h-5 text-gray-700 dark:text-gray-200" />
// //         </button>

// //         {/* Navigation */}
// //         <nav className="p-4 space-y-2">
// //           {navigation.map((item) => (
// //             <NavLink
// //               key={item.name}
// //               to={item.href}
// //               onClick={onClose}
// //               className={({ isActive }) =>
// //                 `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
// //                   isActive
// //                     ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
// //                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
// //                 }`
// //               }
// //             >
// //               <item.icon className="w-5 h-5" />
// //               <span className="font-medium">{item.name}</span>
// //             </NavLink>
// //           ))}
// //         </nav>

// //         {/* Footer Tip */}
// //         <div className="absolute bottom-4 left-4 right-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
// //           <p className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">
// //             🚀 Productivity Tip
// //           </p>
// //           <p className="text-xs text-gray-600 dark:text-gray-300">
// //             Complete your most important task first thing in the morning!
// //           </p>
// //         </div>
// //       </aside>
// //     </>
// //   );
// // };

// // export default Sidebar;



// import { NavLink } from 'react-router-dom';
// import { 
//   FiHome, 
//   FiCheckSquare, 
//   FiTarget, 
//   FiBook, 
//   FiEdit, 
//   FiBarChart2,
//   FiX
// } from 'react-icons/fi';

// const Sidebar = ({ isOpen, onClose }) => {
//   const navItems = [
//     { to: '/app/dashboard', icon: FiHome, label: 'Dashboard' },
//     { to: '/app/tasks', icon: FiCheckSquare, label: 'Tasks' },
//     { to: '/app/goals', icon: FiTarget, label: 'Goals' },
//     { to: '/app/skills', icon: FiBook, label: 'Skills' },
//     { to: '/app/reflections', icon: FiEdit, label: 'Reflections' },
//     { to: '/app/analytics', icon: FiBarChart2, label: 'Analytics' },
//   ];

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={onClose}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out ${
//           isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//         }`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo - Mobile */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 lg:hidden">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
//                 <span className="text-white font-bold text-xl">P</span>
//               </div>
//               <span className="text-xl font-bold text-gray-900 dark:text-white">
//                 Progressly
//               </span>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg lg:hidden"
//             >
//               <FiX className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 p-4 space-y-1">
//             {navItems.map((item) => (
//               <NavLink
//                 key={item.to}
//                 to={item.to}
//                 onClick={() => onClose()}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
//                     isActive
//                       ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
//                       : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
//                   }`
//                 }
//               >
//                 {({ isActive }) => (
//                   <>
//                     <item.icon className="w-5 h-5" />
//                     <span className="font-medium">{item.label}</span>
//                   </>
//                 )}
//               </NavLink>
//             ))}
//           </nav>

//           {/* Productivity Tip */}
//           <div className="p-4 m-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
//             <div className="flex items-start gap-2 mb-2">
//               <span className="text-lg">💡</span>
//               <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
//                 Productivity Tip
//               </h4>
//             </div>
//             <p className="text-xs text-gray-600 dark:text-gray-400">
//               Complete your most important task first thing in the morning!
//             </p>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;


import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiCheckSquare, 
  FiTarget, 
  FiBook, 
  FiEdit, 
  FiBarChart2,
  FiX
} from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { to: '/app/dashboard', icon: FiHome, label: 'Dashboard' },
    { to: '/app/tasks', icon: FiCheckSquare, label: 'Tasks' },
    { to: '/app/goals', icon: FiTarget, label: 'Goals' },
    { to: '/app/skills', icon: FiBook, label: 'Skills' },
    { to: '/app/reflections', icon: FiEdit, label: 'Reflections' },
    { to: '/app/analytics', icon: FiBarChart2, label: 'Analytics' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - full height, never scrolls with main content */}
      <aside
        className={`
          flex-shrink-0 w-64 h-full
          bg-white dark:bg-gray-800
          border-r border-gray-200 dark:border-gray-700
          flex flex-col
          transition-transform duration-200 ease-in-out
          fixed inset-y-0 left-0 z-40
          lg:relative lg:translate-x-0 lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile header inside sidebar */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 lg:hidden flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Progressly
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation - scrollable if needed */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => onClose()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 flex-shrink-0`} />
                  <span className="font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Productivity Tip - pinned to bottom */}
        <div className="flex-shrink-0 p-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-lg">💡</span>
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                Productivity Tip
              </h4>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Complete your most important task first thing in the morning!
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;