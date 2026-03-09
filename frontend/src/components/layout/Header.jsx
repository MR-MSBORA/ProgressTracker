// // import { useState } from 'react';
// // import { FiMenu, FiBell, FiUser, FiSun, FiMoon, FiLogOut, FiSettings, FiChevronDown } from 'react-icons/fi';
// // import { useAuth } from '../../context/AuthContext';
// // import { useTheme } from '../../context/ThemeContext';
// // import { Link } from 'react-router-dom';

// // const Header = ({ onMenuClick }) => {
// //   const { user, logout } = useAuth();
// //   const { isDark, toggleTheme } = useTheme();
// //   const [showUserMenu, setShowUserMenu] = useState(false);
// //   const [showNotifications, setShowNotifications] = useState(false);

// //   return (
// //     <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 transition-colors">
// //       <div className="h-full px-4 flex items-center justify-between">
// //         {/* Left: Menu + Logo */}
// //         <div className="flex items-center gap-4">
// //           <button
// //             onClick={onMenuClick}
// //             className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
// //             aria-label="Toggle menu"
// //           >
// //             <FiMenu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
// //           </button>
          
// //           <Link to="/app/dashboard" className="flex items-center gap-2">
// //             <img 
// //               src="/logo.png" 
// //               alt="Progressly" 
// //               className="h-8 w-auto"
// //             />
// //             <span className="hidden sm:block font-bold text-xl text-gray-900 dark:text-white">
// //               Progressly
// //             </span>
// //           </Link>
// //         </div>

// //         {/* Right: Actions + Profile */}
// //         <div className="flex items-center gap-2 sm:gap-3">
// //           {/* Dark Mode Toggle */}
// //           <button
// //             onClick={toggleTheme}
// //             className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
// //             title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
// //             aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
// //           >
// //             {isDark ? (
// //               <FiSun className="w-5 h-5 text-yellow-500" />
// //             ) : (
// //               <FiMoon className="w-5 h-5 text-gray-700" />
// //             )}
// //           </button>

// //           {/* Notifications */}
// //           <div className="relative">
// //             <button 
// //               onClick={() => setShowNotifications(!showNotifications)}
// //               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
// //               aria-label="Notifications"
// //             >
// //               <FiBell className="w-5 h-5 text-gray-700 dark:text-gray-200" />
// //               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
// //             </button>

// //             {/* Notifications Dropdown */}
// //             {showNotifications && (
// //               <>
// //                 <div 
// //                   className="fixed inset-0 z-10" 
// //                   onClick={() => setShowNotifications(false)}
// //                 ></div>
// //                 <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20">
// //                   <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
// //                     <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
// //                   </div>
// //                   <div className="max-h-96 overflow-y-auto">
// //                     <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
// //                       No new notifications
// //                     </div>
// //                   </div>
// //                 </div>
// //               </>
// //             )}
// //           </div>
          
// //           {/* User Menu */}
// //           <div className="relative">
// //             <button
// //               onClick={() => setShowUserMenu(!showUserMenu)}
// //               className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
// //             >
// //               <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
// //                 <span className="text-white font-semibold text-sm">
// //                   {user?.name?.charAt(0).toUpperCase() || 'U'}
// //                 </span>
// //               </div>
// //               <span className="hidden md:block font-medium text-sm text-gray-700 dark:text-gray-200">
// //                 {user?.name || 'User'}
// //               </span>
// //               <FiChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
// //             </button>

// //             {/* User Dropdown */}
// //             {showUserMenu && (
// //               <>
// //                 <div 
// //                   className="fixed inset-0 z-10" 
// //                   onClick={() => setShowUserMenu(false)}
// //                 ></div>
// //                 <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20">
// //                   <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
// //                     <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
// //                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
// //                   </div>
                  
// //                   <Link
// //                     to="/app/settings"
// //                     className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
// //                     onClick={() => setShowUserMenu(false)}
// //                   >
// //                     <FiSettings className="w-4 h-4" />
// //                     Settings
// //                   </Link>
                  
// //                   <button
// //                     onClick={() => {
// //                       setShowUserMenu(false);
// //                       logout();
// //                     }}
// //                     className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
// //                   >
// //                     <FiLogOut className="w-4 h-4" />
// //                     Logout
// //                   </button>
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Header;
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FiBell, FiSun, FiMoon, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
// import { useAuth } from '../../context/AuthContext';
// import { useTheme } from '../../context/ThemeContext';

// const Header = () => {
//   const { user, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const [showDropdown, setShowDropdown] = useState(false);

//   return (
//     <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
//       <div className="flex items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <Link to="/app/dashboard" className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
//             <span className="text-white font-bold text-xl">P</span>
//           </div>
//           <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
//             Progressly
//           </span>
//         </Link>

//         {/* Right side */}
//         <div className="flex items-center gap-4">
//           {/* Theme Toggle */}
//           <button
//             onClick={toggleTheme}
//             className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//             aria-label="Toggle theme"
//           >
//             {theme === 'dark' ? (
//               <FiSun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//             ) : (
//               <FiMoon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//             )}
//           </button>

//           {/* Notifications */}
//           <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
//             <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>

//           {/* User Menu */}
//           <div className="relative">
//             <button
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//             >
//               <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
//                 <span className="text-white font-semibold text-sm">
//                   {user?.name?.charAt(0).toUpperCase() || 'U'}
//                 </span>
//               </div>
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:block">
//                 {user?.name || 'User'}
//               </span>
//             </button>

//             {/* Dropdown */}
//             {showDropdown && (
//               <>
//                 <div
//                   className="fixed inset-0 z-10"
//                   onClick={() => setShowDropdown(false)}
//                 ></div>
//                 <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20">
//                   <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
//                     <p className="text-sm font-medium text-gray-900 dark:text-white">
//                       {user?.name}
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                       {user?.email}
//                     </p>
//                   </div>

//                   <Link
//                     to="/app/settings"
//                     className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                     onClick={() => setShowDropdown(false)}
//                   >
//                     <FiSettings className="w-4 h-4" />
//                     Settings
//                   </Link>

//                   <button
//                     onClick={() => {
//                       logout();
//                       setShowDropdown(false);
//                     }}
//                     className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
//                   >
//                     <FiLogOut className="w-4 h-4" />
//                     Logout
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBell, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/app/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
            Progressly
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:block">
                {user?.name || 'User'}
              </span>
            </button>

            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <Link
                    to="/app/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowDropdown(false)}
                  >
                    <FiSettings className="w-4 h-4" />
                    Settings
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;