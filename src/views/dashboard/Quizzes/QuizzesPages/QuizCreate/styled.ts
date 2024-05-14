import styled from "styled-components";

type Props = {
  justify?: "space-between" | "flex-end" | "flex-start";
  active?: boolean;
};

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 9vh);
  padding: 20px;
  @media screen and (min-width: 600px) {
    padding: 20px 40px;
  }
`;

export const ContainerInner = styled.div`
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

export const QuestionTag = styled.button<Props>`
  background-color: ${({ active }) => (active ? "#4a4747" : "#FFFFFF")};
  color: ${({ active }) => (!active ? "#4a4747" : "#FFFFFF")};
  border: 1px solid ${({ active }) => (!active ? "#4a4747" : "#FFFFFF")};
  outline: none;
  border-radius: 20px;
  padding: 10px 15px;
  font-size: 0.8rem;
  cursor: pointer;
`;
