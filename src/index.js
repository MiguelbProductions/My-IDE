import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './theme';

const ThemedApp = () => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <App toggleTheme={toggleTheme} theme={theme} />
    </ThemeProvider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<ThemedApp />);
