// 



import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import VerifyEmail from './pages/auth/VerifyEmail';

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
      <ThemeProvider>
        <AuthProvider>
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '14px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />

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

            {/* 404 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;