import styled from "styled-components";

type Props = {
  width: string;
};

export const OptionButtonContainer = styled.div`
  grid-area: "card1";
  display: flex;
  gap: 30px;
  padding: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const OptionButton = styled.button<Props>`
  background-color: transparent;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 50px 0;
  width: ${({ width }) => width};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.1s ease-in-out all;

  &:hover {
    transform: scale(1.05);
  }
`;
