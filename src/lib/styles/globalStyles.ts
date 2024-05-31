import { DefaultTheme, createGlobalStyle } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    background: {
      default: "#f8f8f8",
      secondary: "#FAFAFA",
      tertiary: "#FFFFFF",
      highlight: "#F0F0F0",
    },
    main: {
      default: "#4a4747",
      primary: "#f5f6fa",
      secondary: "#e6e6e6",
    },
    quiz: {
      default: "#4a4747",
      right: "#89c799",
      rightSecondary: "#a6e3b6",
      wrong: "#c78788",
      wrongPrimary: "#e3a6a7",
      wrongSecondary: "#996868",
    },
    alert: {
      error: "#c78788",
      success: "#89c799",
      warning: "#dbd15a",
      info: "#4a4747",
    },
    text: {
      error: "#c78788",
      success: "#89c799",
      warning: "#ccc67e",
      default: "#4a4747",
      light: "#f8f8f8",
    },
    button: {
      primary: "#4a4747",
      secondary: "#f8f8f8",
      danger: "#c78788",
      success: "#89c799",
      "anchor-dark": "transparent",
      "anchor-white": "transparent",
    },
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    background: {
      default: "#0E2738",
      secondary: "#3B3D43",
      tertiary: "#3B3D43",
      highlight: "#0C1A38",
    },
    main: {
      default: "#537C98",
      primary: "#3B3D43",
      secondary: "#0C1A38",
    },
    quiz: {
      default: "#4a4747",
      right: "#89c799",
      rightSecondary: "#a6e3b6",
      wrong: "#c78788",
      wrongPrimary: "#e3a6a7",
      wrongSecondary: "#996868",
    },
    alert: {
      error: "#c78788",
      success: "#89c799",
      warning: "#ccc67e",
      info: "#4a4747",
    },
    text: {
      error: "#c78788",
      success: "#89c799",
      warning: "#ccc67e",
      default: "#f8f8f8",
      light: "#f8f8f8",
    },
    button: {
      primary: "#537C98",
      secondary: "#0E2738",
      danger: "#c78788",
      success: "#89c799",
      "anchor-dark": "transparent",
      "anchor-white": "transparent",
    },
  },
};

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
    line-height: normal;
  }
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  *::-webkit-scrollbar {
      width: 4px;
      height: 6px;
  }
  *::-webkit-scrollbar-button {
      background-color: ${({ theme }) => theme.colors.background.highlight};
      height: 0px;
  }
  *::-webkit-scrollbar-track {
      background-color: transparent;
  }
  *::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 5px;
      @media screen and (min-width: 900px) {
        background-color: ${({ theme }) => theme.colors.main.default};
      }
  }
  *::-webkit-scrollbar-corner {
      background-color: transparent;
  }
`;

export default GlobalStyle;
