export const themes = {
  light: {
    primary: "#fff",
    white: "#fff",
    black: "#606060",
    background: "#f2f3f5",
    background_Modal: "rgba(218, 221, 226, 0.8)",
    gray_line: "#dcdde0",
    text: "#666666",
    text_highlight: "#b3b9ff",
    title: "#2e384d",
    red: "#e83f5b",
    green: "#4cd62b",
    blue: "#5965e0",
    blue_dark: "#4953b8",
    blue_light: "#2aa9e0",
  },
  dark: {
    primary: "#2c2828",
    white: "#fff",
    black: "#606060",
    background: "#1d1d1d",
    background_Modal: "rgba(55, 57, 61, 0.8)",
    gray_line: "#afafaf",
    text: "#bebebe",
    text_highlight: "#b3b9ff",
    title: "#dcdde0",
    red: "#e83f5b",
    green: "#3eaf22",
    blue: "#5965e0",
    blue_dark: "#4953b8",
    blue_light: "#2aa9e0",
  },
};

export type ThemeName = keyof typeof themes;
export type ThemeType = typeof themes.light | typeof themes.dark;
