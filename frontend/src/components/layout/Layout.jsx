// import { Outlet } from 'react-router-dom';
// import { useState } from 'react';
// import Header from './Header';
// import Sidebar from './Sidebar';

// const Layout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Header onMenuClick={() => setSidebarOpen(true)} />
      
//       <div className="flex">
//         <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
//         <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;

import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      
      {/* Header - fixed height, never moves */}
      <div className="flex-shrink-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
      </div>

      {/* Body - fills remaining height */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar - fixed, never scrolls with content */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content - only this scrolls */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default Layout;