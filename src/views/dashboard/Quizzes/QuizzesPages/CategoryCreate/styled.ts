import styled from "styled-components";

import { FaTrashAlt } from "react-icons/fa";

type Props = {
  justify?: "space-between" | "flex-end" | "flex-start";
  active?: boolean;
  padding?: boolean;
};

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ContainerInner = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 20px 0px;

  display: flex;
  flex-direction: column;
  height: calc(100vh - 9vh);
  padding: 10px 0;

  @media screen and (min-width: 600px) {
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

export const ButtonContainer = styled.div<Props>`
  grid-area: "buttonContainer";
  display: flex;
  justify-content: ${({ justify }) => justify || "flex-end"};
  margin-bottom: 45px;

  @media screen and (min-width: 600px) {
    margin-bottom: 0px;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
`;

export const Form = styled.form<Props>`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding-bottom: ${({ padding }) => (padding ? "150" : "")}px;
`;

export const EmptyForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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

export const InputLabel = styled.input`
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  outline: none;
  margin-bottom: 4px;
`;

export const ExtraInfoContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-end;
`;

export const DeleteIcon = styled(FaTrashAlt)`
  margin-bottom: 12px;
`;

export const CategoryCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  overflow: auto;
  padding-bottom: 150px;
`;

export const CategoryTitle = styled.h3``;

export const CategoryCard = styled.div<Props>`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  border-radius: 10px;
  padding: 5px 15px 5px 10px;
  cursor: pointer;

  width: 100%;

  background-color: ${({ active, theme }) =>
    active ? theme.colors.main.default : ""};

  ${CategoryTitle} {
    color: ${({ active, theme }) =>
      active ? theme.colors.background.tertiary : theme.colors.main.default};
  }

  @media screen and (min-width: 600px) {
    width: 48%;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  margin: 20px 0 0;
`;
