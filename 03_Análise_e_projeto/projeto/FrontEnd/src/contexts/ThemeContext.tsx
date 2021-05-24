import { createContext, ReactNode, useContext, useState } from "react";
import { ThemeName } from "../styles/themes";

interface ThemeContextData {
  themeName: ThemeName;
  getThemeName: (newTheme: ThemeName) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>("dark");

  function getThemeName(value: ThemeName) {
    setThemeName(value);
  }

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        getThemeName,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useContextThemeData() {
  const context = useContext(ThemeContext);

  return context;
}
