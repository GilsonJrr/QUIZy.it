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
  /* Estilo para todos os elementos com barra de rolagem */
  *::-webkit-scrollbar {
      width: 5px; /* largura da barra de rolagem */
  }

  /* Estilizando o botão de rolagem para cima e para baixo */
  *::-webkit-scrollbar-button {
      background-color: #ccc; /* cor do botão de rolagem */
      height: 0px;
  }

  /* Estilizando a pista (trilha) da barra de rolagem */
  *::-webkit-scrollbar-track {
      background-color: transparent; /* cor da pista da barra de rolagem */
  }

  /* Estilizando o polegar da barra de rolagem */
  *::-webkit-scrollbar-thumb {
      background-color: #888; /* cor do polegar da barra de rolagem */
      border-radius: 5px; /* borda arredondada */
  }

  /* Estilizando o canto da barra de rolagem */
  *::-webkit-scrollbar-corner {
      background-color: transparent; /* cor do canto da barra de rolagem */
  }

  /* Adicione mais estilos globais conforme necessário */
`;

export default GlobalStyle;
