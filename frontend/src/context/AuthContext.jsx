import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get('/auth/me');
      setUser(data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Load user error:', error);
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      toast.success('Registration successful! You can now login.', {
        duration: 4000,
        icon: '🎉',
      });

      return { success: true, data };
    } catch (error) {
      console.error('Register error:', error);

      let errorMessage = 'Registration failed. Please try again.';

      // if (error.response?.data?.error) {
      //   if (Array.isArray(error.response.data.error)) {
      //     errorMessage = error.response.data.error.join(', ');
      //   } else {
      //     errorMessage = error.response.data.error;
      //   }
      // }
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage, { duration: 5000 });
      return { success: false, error: errorMessage };
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', {
        email,
        password,
      });

      // Save token FIRST
      localStorage.setItem('token', data.token);

      // Update state
      setUser(data.user);
      setIsAuthenticated(true);

      // Show success message
      toast.success(`Welcome back, ${data.user.name}!`, {
        icon: '👋',
        duration: 2000,
      });

      // Navigate immediately (don't wait)
      navigate('/app/dashboard', { replace: true });

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);

      let errorMessage = 'Login failed. Please try again.';

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      }

      toast.error(errorMessage, { duration: 4000 });
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
    navigate('/login', { replace: true });
  };

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};