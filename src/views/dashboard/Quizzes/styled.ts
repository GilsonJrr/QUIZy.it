import styled from "styled-components";

// type Props = {};

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

export const OptionButton = styled.button`
  background-color: transparent;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease-in-out all;

  &:hover {
    transform: scale(1.05);
  }
`;
