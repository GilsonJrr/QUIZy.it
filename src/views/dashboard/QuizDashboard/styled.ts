import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (min-width: 600px) {
    width: 100%;
    min-height: 100%;
    padding: 20px 40px;
    height: calc(100vh - 9vh);

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-template-areas:
      "card1 card3"
      "card1 card3"
      "card2 card3"
      "card2 card3";
  }
`;
