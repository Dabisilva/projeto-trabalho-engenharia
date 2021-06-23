import { useContextThemeData } from "../contexts/ThemeContext";
import { ButtonTogle } from "../styles/components/HeaderTheme.module";
import { ThemeName } from "../styles/themes";

interface HeaderProps {
  themeName: ThemeName;
  setThemeName: (newName: ThemeName) => void;
  hidden?: boolean;
}

export const HeaderTheme: React.FC<HeaderProps> = ({
  themeName,
  setThemeName,
  hidden,
}) => {
  //const { getThemeName, themeName } = useContextThemeData();

  function toggleTheme() {
    setThemeName(themeName === "light" ? "dark" : "light");
  }
  return (
    <ButtonTogle
      style={{ display: hidden ? "none" : "" }}
      onClick={toggleTheme}
    >
      Tema {themeName === "light" ? "Escuro" : "Claro"}
    </ButtonTogle>
  );
};
