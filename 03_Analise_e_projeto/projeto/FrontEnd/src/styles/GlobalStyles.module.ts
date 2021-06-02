import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
   * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@media (max-width: 1280px) {
  html {
    font-size: 93.75%;
  }
}

@media (max-width: 1155px) {
  html {
    font-size: 87.5%;
  }
}
@media (max-width: 1085px) {
  html {
    font-size: 80.5%;
  }
}

@media (max-width: 992px) {
  html {
    font-size: 70.5%;
  }
}

@media (max-width:  875px) {
  html {
    font-size: 63.5%;
  }
}

@media (max-width: 795px ) {
  html {
    font-size: 60.5%;
  }
}
@media (max-width: 710px ) {
  html {
    font-size: 57.5%;
  }
}
@media (max-width: 627px ) {
  html {
    font-size: 55.5%;
  }
}
@media (max-width: 669px ) {
  html {
    font-size: 50.5%;
  }
}


body {
  background: var(--background);
  color: var(--text);
}

body,
input,
textarea,
button {
  font: 400 1rem "Inter", sans-serif;
}

button {
  cursor: pointer;
  border: none;
  border-radius: 4px;
}

a {
  color: inherit;
  text-decoration: none;
}


:root{
      ${(props) => {
        let theme = props.theme;

        let themeArray = Object.entries(theme);

        let append = "";
        themeArray.map(([prop, value]) => {
          append += `--${prop}: ${value};`;
        });

        return append;
      }}
    }
`;
