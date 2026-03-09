// import { createContext, useContext, useEffect, useState } from 'react';

// const ThemeContext = createContext();

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within ThemeProvider');
//   }
//   return context;
// };

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(() => {
//     // Get theme from localStorage or default to 'light'
//     const savedTheme = localStorage.getItem('theme');
//     return savedTheme || 'light';
//   });

//   useEffect(() => {
//     // Apply theme to document
//     const root = window.document.documentElement;
    
//     if (theme === 'dark') {
//       root.classList.add('dark');
//     } else {
//       root.classList.remove('dark');
//     }

//     // Save to localStorage
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };







import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Add changing class to prevent transitions during theme switch
    root.classList.add('changing-theme');
    
    // Remove both theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Remove changing class after a brief delay
    setTimeout(() => {
      root.classList.remove('changing-theme');
    }, 50);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};