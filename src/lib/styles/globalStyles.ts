import { DefaultTheme, createGlobalStyle } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    background: {
      default: "#f8f8f8",
      secondary: "#FAFAFA",
      tertiary: "#FFFFFF",
      highlight: "#d9dadb",
    },
    main: {
      default: "#4a4747",
    },
    quiz: {
      right: "#89c799",
      wrong: "#c78788",
    },
  },
};

// ${({ theme }) => theme.colors.background.default}

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
