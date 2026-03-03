// import { createContext, useState, useEffect, useContext } from 'react';

// const ThemeContext = createContext();

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within ThemeProvider');
//   }
//   return context;
// };

// export const ThemeProvider = ({ children }) => {
//   const [isDark, setIsDark] = useState(() => {
//     // Check localStorage first
//     const saved = localStorage.getItem('theme');
//     if (saved) return saved === 'dark';
    
//     // Check system preference
//     return window.matchMedia('(prefers-color-scheme: dark)').matches;
//   });

//   useEffect(() => {
//     // Update document class for Tailwind
//     if (isDark) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
    
//     // Save preference to localStorage
//     localStorage.setItem('theme', isDark ? 'dark' : 'light');
//   }, [isDark]);

//   const toggleTheme = () => {
//     setIsDark((prev) => !prev);
//   };

//   const value = {
//     isDark,
//     toggleTheme,
//   };

//   return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
// };





import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};