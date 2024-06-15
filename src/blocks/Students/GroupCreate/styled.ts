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
  overflow: hidden;
`;

export const ContainerInner = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px;

  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;

  overflow-y: scroll;
  margin-bottom: 100px;

  position: relative;

  @media screen and (min-width: 900px) {
    margin-bottom: 0px;
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
  position: fixed;
  bottom: -25px;
  width: 100%;
  left: 0;
  padding: 0 16px;

  @media screen and (min-width: 900px) {
    position: relative;
    margin-bottom: 0px;
    bottom: 0;
    right: 0;
    padding: 0;
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
  grid-area: newQuiz;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
  padding-bottom: ${({ padding }) => (padding ? "150" : "")}px;
  height: 100%;
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

export const GroupCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  overflow: auto;
`;

export const GroupCard = styled.div<Props>`
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

  @media screen and (min-width: 900px) {
    width: 48%;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  margin: 10px 0 0;
`;

export const NameColorContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  flex-direction: column;
  @media screen and (min-width: 900px) {
    flex-direction: row;
  }
`;

export const TextAreaContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
`;
