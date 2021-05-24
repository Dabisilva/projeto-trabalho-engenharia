import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { HeaderTheme } from "../components/HeaderTheme";
import GlobalStylesModule from "../styles/GlobalStyles.module";
import { ThemeName, themes } from "../styles/themes";

function MyApp({ Component, pageProps }) {
  const [themeName, setThemeName] = useState<ThemeName>("dark");
  const currentTheme = themes[themeName];
  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <GlobalStylesModule />
        {/* <HeaderTheme themeName={themeName} setThemeName={setThemeName} /> */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
