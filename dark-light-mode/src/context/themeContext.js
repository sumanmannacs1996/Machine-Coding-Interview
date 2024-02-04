import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [isDarkmode, setDarkmode] = useState(false);

  const togleTheme = () => setDarkmode((prev) => !prev);

  const theme = isDarkmode ? "dark" : "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkmode]);

  return (
    <ThemeContext.Provider value={{ theme, togleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
