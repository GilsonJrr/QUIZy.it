// ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { theme, darkTheme } from "../globalStyles";

type ThemeType = "dark" | "light";
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  defaultTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProviderComponent: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialTheme =
    String(localStorage.getItem("quizy.it_theme")).toLowerCase() === "true";

  const [isDarkMode, setIsDarkMode] = useState(initialTheme || false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const defaultTheme = (theme: ThemeType) => {
    setIsDarkMode(theme === "dark" ? true : false);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, defaultTheme }}>
      <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
