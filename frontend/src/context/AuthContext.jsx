// import { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState(localStorage.getItem('token'));
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       loadUser();
//     } else {
//       setLoading(false);
//     }
//   }, [token]);

//   const loadUser = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:5000/api/auth/me');
//       setUser(data.data);
//     } catch (error) {
//       logout();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const { data } = await axios.post('http://localhost:5000/api/auth/login', {
//         email,
//         password,
//       });
      
//       localStorage.setItem('token', data.token);
//       setToken(data.token);
//       setUser(data.user);
      
//       return { success: true };
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.error || 'Login failed',
//       };
//     }
//   };

//   const register = async (name, email, password) => {
//     try {
//       const { data } = await axios.post('http://localhost:5000/api/auth/register', {
//         name,
//         email,
//         password,
//       });
      
//       return { success: true, data };
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.error || 'Registration failed',
//       };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUser(null);
//     delete axios.defaults.headers.common['Authorization'];
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated: !!user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };






// import { createContext, useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from "../utils/api"
// import toast from 'react-hot-toast';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
  
//   const navigate = useNavigate();

//   // Load user on mount
//   useEffect(() => {
//     loadUser();
//   }, []);

//   // Load user from token
//   const loadUser = async () => {
//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data } = await api.get('/auth/me');
//       setUser(data.data);
//       setIsAuthenticated(true);
//     } catch (error) {
//       console.error('Load user error:', error);
//       localStorage.removeItem('token');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Register
//   const register = async (name, email, password) => {
//     try {
//       const { data } = await api.post('/auth/register', {
//         name,
//         email,
//         password,
//       });

//       toast.success('Registration successful! Please check your email to verify your account.');
      
//       return { success: true, data };
//     } catch (error) {
//       const message = error.response?.data?.error || 'Registration failed';
//       toast.error(message);
//       return { success: false, error: message };
//     }
//   };

//   // Login
//   const login = async (email, password) => {
//     try {
//       const { data } = await api.post('/auth/login', {
//         email,
//         password,
//       });

//       localStorage.setItem('token', data.token);
//       setUser(data.user);
//       setIsAuthenticated(true);

//       toast.success(`Welcome back, ${data.user.name}!`);
//       navigate('/app/dashboard');

//       return { success: true };
//     } catch (error) {
//       const message = error.response?.data?.error || 'Login failed';
//       toast.error(message);
//       return { success: false, error: message };
//     }
//   };

//   // Logout
//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     setIsAuthenticated(false);
//     toast.success('Logged out successfully');
//     navigate('/login');
//   };

//   // Update user profile
//   const updateUser = (updatedData) => {
//     setUser((prev) => ({ ...prev, ...updatedData }));
//   };

//   const value = {
//     user,
//     loading,
//     isAuthenticated,
//     register,
//     login,
//     logout,
//     updateUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// import { createContext, useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import api from "./frontend/src/utils/api.js";
// // Create Context
// const AuthContext = createContext(null);

// // Custom Hook (NOT exported separately)
// const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }

//   return context;
// };

// // Provider Component (ONLY export)
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     loadUser();
//   }, []);

//   const loadUser = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setLoading(false);
//       return;
//     }
//     try {
//       const { data } = await api.get("/auth/me");
//       setUser(data.data);
//       setIsAuthenticated(true);
//     } catch (error) {
//       console.error("Load user error:", error);
//       localStorage.removeItem("token");
//       setIsAuthenticated(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const register = async (name, email, password) => {
//     try {
//       const { data } = await api.post("/auth/register", {
//         name,
//         email,
//         password,
//       });

//       toast.success(
//         "Registration successful! Please check your email."
//       );

//       return { success: true, data };
//     } catch (error) {
//       const message =
//         error.response?.data?.error || "Registration failed";

//       toast.error(message);
//       return { success: false, error: message };
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const { data } = await api.post("/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", data.token);
//       setUser(data.user);
//       setIsAuthenticated(true);

//       toast.success(`Welcome back, ${data.user.name}!`);
//       navigate("/app/dashboard");

//       return { success: true };
//     } catch (error) {
//       const message =
//         error.response?.data?.error || "Login failed";

//       toast.error(message);
//       return { success: false, error: message };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     setIsAuthenticated(false);

//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   const updateUser = (updatedData) => {
//     setUser((prev) => ({ ...prev, ...updatedData }));
//   };

//   const value = {
//     user,
//     loading,
//     isAuthenticated,
//     register,
//     login,
//     logout,
//     updateUser,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Export hook as default (optional clean trick)
// export default useAuth;


import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api"; // ✅ Correct relative path

// Create Context
const AuthContext = createContext(null);

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/auth/me");

      setUser(data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Load user error:", error);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Registration successful! Please check your email.");
      return { success: true, data };
    } catch (error) {
      const message =
        error.response?.data?.error || "Registration failed";

      toast.error(message);
      return { success: false, error: message };
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuthenticated(true);

      toast.success(`Welcome back, ${data.user.name}!`);
      navigate("/app/dashboard");

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.error || "Login failed";

      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);

    toast.success("Logged out successfully");
    navigate("/login");
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};