import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Defina seu estilo global aqui */
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

  /* Adicione mais estilos globais conforme necessário */
`;

export default GlobalStyle;
