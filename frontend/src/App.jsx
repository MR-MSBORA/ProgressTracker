// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { Toaster } from 'react-hot-toast';
// // import { AuthProvider } from './context/AuthContext';

// // // Landing Page
// // import LandingPage from './pages/LandingPage';

// // // Layout
// // import Layout from './components/layout/Layout';

// // // Auth Pages
// // import Login from './pages/auth/Login';
// // import Register from './pages/auth/Register';

// // // Dashboard Pages
// // import Dashboard from './pages/dashboard/Dashboard';
// // import Tasks from './pages/Tasks';
// // import Goals from './pages/Goals';
// // import Skills from './pages/Skills';
// // import Reflections from './pages/Reflections';
// // import Analytics from './pages/Analytics';

// // // Protected Route
// // import ProtectedRoute from './components/common/ProtectedRoute';

// // function App() {
// //   return (
// //     <Router>
// //       <Toaster position="top-right" />
      
// //       <Routes>
// //         {/* Public Landing Page */}
// //         <Route path="/" element={<LandingPage />} />
        
// //         {/* Auth Routes */}
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />
        
// //         {/* Protected Routes */}
// //         <Route
// //           path="/app"
// //           element={
// //             <AuthProvider>
// //               <ProtectedRoute>
// //                 <Layout />
// //               </ProtectedRoute>
// //             </AuthProvider>
// //           }
// //         >
// //           <Route index element={<Navigate to="/app/dashboard" replace />} />
// //           <Route path="dashboard" element={<Dashboard />} />
// //           <Route path="tasks" element={<Tasks />} />
// //           <Route path="goals" element={<Goals />} />
// //           <Route path="skills" element={<Skills />} />
// //           <Route path="reflections" element={<Reflections />} />
// //           <Route path="analytics" element={<Analytics />} />
// //         </Route>
        
// //         <Route path="*" element={<Navigate to="/" replace />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;

// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';

// // Landing Page
// import LandingPage from './pages/LandingPage';

// // Auth Pages
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';

// // Dashboard Pages
// import Dashboard from './pages/dashboard/Dashboard';

// function App() {
//   return (
//     <Router>
//       <Toaster position="top-right" />
      
//       <Routes>
//         {/* Landing Page */}
//         <Route path="/" element={<LandingPage />} />
        
//         {/* Auth Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
        
//         {/* Dashboard (temporary simple route) */}
//         <Route path="/dashboard" element={<Dashboard />} />
        
//         {/* Redirect */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Landing Page
import LandingPage from './pages/LandingPage';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import Tasks from './pages/Tasks';
import Goals from './pages/Goals';
import Skills from './pages/Skills';
import Reflections from './pages/Reflections';
import Analytics from './pages/Analytics';

// Layout & Protected Route
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            success: { duration: 3000 },
            error: { duration: 4000 },
          }}
        />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="goals" element={<Goals />} />
            <Route path="skills" element={<Skills />} />
            <Route path="reflections" element={<Reflections />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
          
          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;