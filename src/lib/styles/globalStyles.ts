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
      warning: "#ccc67e",
      info: "#4a4747",
    },
  },
};

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  *::-webkit-scrollbar {
      width: 4px;
  }
  *::-webkit-scrollbar-button {
      background-color: ${({ theme }) => theme.colors.background.highlight};
      height: 0px;
  }
  *::-webkit-scrollbar-track {
      background-color: transparent;
  }
  *::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.main.default};
      border-radius: 5px;
  }
  *::-webkit-scrollbar-corner {
      background-color: transparent;
  }
`;

export default GlobalStyle;
