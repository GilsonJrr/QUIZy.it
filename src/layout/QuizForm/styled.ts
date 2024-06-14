import styled from "styled-components";

type Props = {
  justify?: "space-between" | "flex-end" | "flex-start";
  active?: boolean;
};

export const Container = styled.div<Props>`
  width: 100%;
  height: 100%;
  padding: 0px;

  display: flex;
  flex-direction: column;

  @media screen and (min-width: 900px) {
    height: 100%;
    padding: 0px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 0.2fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-template-areas:
      "newQuiz newQuestion"
      "newQuiz newQuestion"
      "newQuiz buttonContainer";
  }
`;

export const ChildrenContainer = styled.div`
  grid-area: newQuiz;
`;

export const ButtonContainer = styled.div<Props>`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  justify-content: ${({ justify }) => justify || "flex-end"};
  width: 100%;
  padding: 10px 15px;

  @media screen and (min-width: 900px) {
    position: relative;
    grid-area: "buttonContainer";
    display: flex;
    justify-content: ${({ justify }) => justify || "flex-end"};
    margin-bottom: 5px;
    padding: 0;
  }
`;
