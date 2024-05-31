import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 900px) {
    /* padding: 20px 40px; */
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-template-areas:
      "card1 card3"
      "card2 card3"
      "card2 card3";
  }
`;

export const OptionButtonContainer = styled.div`
  grid-area: "card1";
  display: flex;
  gap: 30px;
  padding: 30px;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  z-index: 30000;
  width: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 20px 0;
`;

export const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
