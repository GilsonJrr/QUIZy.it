import styled from "styled-components";

type Props = {
  justify?: "space-between" | "flex-end" | "flex-start";
  active?: boolean;
  width?: number;
};

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 120px;
  @media screen and (min-width: 900px) {
    margin-bottom: 0;
  }
`;

export const ContainerInner = styled.div`
  width: 100%;
  min-height: 100%;
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
`;

export const ButtonContainer = styled.div<Props>`
  grid-area: "buttonContainer";
  display: flex;
  justify-content: ${({ justify }) => justify || "flex-end"};
  margin-top: 20px;
`;

export const SelectContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const AnswerContainer = styled.div<Props>`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  align-items: center;
  justify-content: ${({ justify }) => justify || "center"};
  margin: 5px 0;
`;

export const Label = styled.div`
  color: green;
  font-weight: 700;
`;

export const QuestionsContainer = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Words = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

//PREVIE STYLES

export const Input = styled.input<Props>`
  border: none;
  outline: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.main.default};
  font-size: 1.2rem;
  background-color: ${({ theme }) => theme.colors.background.default};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: ${({ width }) => width || 3}rem;
`;
