import styled from "styled-components";

type Props = {
  justify?: "space-between" | "flex-end" | "flex-start";
  active?: boolean;
};

export const Container = styled.div<Props>`
  width: 100%;
  min-height: 100%;
  padding: 20px 0px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 0.2fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-areas:
    "newQuiz newQuestion"
    "newQuiz newQuestion"
    "newQuiz buttonContainer";
`;

export const ButtonContainer = styled.div<Props>`
  grid-area: "buttonContainer";
  display: flex;
  justify-content: ${({ justify }) => justify || "flex-end"};
`;

export const SubmitButton = styled.button`
  background-color: #4a4747;
  outline: none;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 40px;
  font-size: 1.3rem;
  cursor: pointer;
`;

export const DeleteButton = styled.button`
  background-color: #c78788;
  outline: none;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 40px;
  font-size: 1.3rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
`;
