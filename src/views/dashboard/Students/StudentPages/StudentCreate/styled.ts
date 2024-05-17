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
  height: calc(100vh - 9vh);
  padding: 20px;
  position: relative;

  @media screen and (min-width: 600px) {
    padding: 20px 40px;
  }
`;

export const ContainerInner = styled.div`
  width: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;

  @media screen and (min-width: 600px) {
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
  }
`;

export const ButtonContainer = styled.div<Props>`
  grid-area: "buttonContainer";
  display: flex;
  justify-content: ${({ justify }) => justify || "flex-end"};

  margin-bottom: 55px;
  padding-top: 10px;
  @media screen and (min-width: 600px) {
    margin-bottom: 0;
  }
`;

export const ButtonCardContainer = styled.div<Props>`
  grid-area: "buttonContainer";
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 30px;
  width: 100%;
  justify-content: center;

  @media screen and (min-width: 600px) {
    justify-content: ${({ justify }) => justify || "flex-end"};
    background: linear-gradient(
      0deg,
      ${({ theme }) => theme.colors.background.default} 20%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-direction: column;
  @media screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

export const Form = styled.form<Props>`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding-bottom: ${({ padding }) => (padding ? "150" : "")}px;
  overflow-y: scroll;
`;

export const EmptyForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  h2 {
    font-size: 1.3rem;
    text-align: center;
    font-weight: 500;
  }
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
  background-color: transparent;
`;

export const ExtraInfoContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-end;
`;

export const DeleteIcon = styled(FaTrashAlt)`
  margin-bottom: 12px;
`;

export const TabContainer = styled.div`
  display: flex;
  margin: 20px 0 0;
`;
