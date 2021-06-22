import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { HeaderTheme } from "../components/HeaderTheme";
import { ChallengesProvider } from "../contexts/ChallengeContext";
import { ThemeName, themes } from "../styles/themes";
import GlobalStylesModule from "../styles/GlobalStyles.module";
import { ToastContainer, Slide } from "react-toastify";
import { AuthProvider } from "../contexts/AuthContext";
import { Provider as NextAuthProvider } from "next-auth/client";
import "react-toastify/dist/ReactToastify.min.css";

function MyApp({ Component, pageProps }) {
  const [themeName, setThemeName] = useState<ThemeName>("dark");
  const currentTheme = themes[themeName];
  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <GlobalStylesModule />
        {/* <HeaderTheme themeName={themeName} setThemeName={setThemeName} /> */}
        <AuthProvider>
          <NextAuthProvider session={pageProps.session}>
            <ChallengesProvider>
              <Component {...pageProps} />
              <ToastContainer
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Slide}
              />
            </ChallengesProvider>
          </NextAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
