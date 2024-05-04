import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 20px 40px;
  height: calc(100vh - 9vh);

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-areas:
    "card1 card3"
    "card2 card3"
    "card2 card3";
`;

export const OptionButtonContainer = styled.div`
  grid-area: "card1";
  display: flex;
  gap: 30px;
  padding: 30px;
`;

export const GoBackButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  width: calc(100% - 40px);
  background-color: #4a4747;
  outline: none;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 15px;
  font-size: 1.3rem;
  cursor: pointer;
  z-index: 1000;
`;
