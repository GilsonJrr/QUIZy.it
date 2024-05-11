import styled from "styled-components";

type Props = {
  progress?: number;
  active?: boolean;
  buttonType?: "primary" | "secondary";
  modalType?: string;
  checkType?: string;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0px;
  box-sizing: border-box;
  width: 100%;

  @media screen and (min-width: 600px) {
    padding: 0px;
  }
`;

export const QuizContainer = styled.div`
  padding: 20px 15px;
  @media screen and (min-width: 600px) {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  @media screen and (min-width: 600px) {
    gap: 30px;
  }
`;

export const Coins = styled.div`
  background-color: #ffffff;
  padding: 5px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-weight: 800;
`;

export const Title = styled.h1`
  font-size: 20px;
`;

export const QuestionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  @media screen and (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 50px;
    align-items: flex-start;
    justify-content: center;
    gap: 50px;
  }
`;

export const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 600px) {
    width: 50%;
  }
`;

export const Question = styled.h3`
  text-align: center;
  color: #4a4747;
  margin-bottom: 30px;
  @media screen and (min-width: 600px) {
    width: 50%;
    text-align: top;
    font-size: 2rem;
    margin: 10px;
    margin-bottom: 0px;
  }
`;

export const Close = styled.div`
  background-color: transparent;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
  @media screen and (min-width: 600px) {
    background-color: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
`;

export const ProgressContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const ProgressBar = styled.div`
  background-color: #ffffff;
  border-radius: 50px;
  width: 100%;
  height: 20px;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;

export const ProgressBarFill = styled.div<Props>`
  position: absolute;
  top: 0;
  border-radius: 50px;
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: #89c799;
`;

export const ProgressNumber = styled.h3``;

export const AnswerButton = styled.button<Props>`
  border: none;
  width: 90%;
  background-color: ${({ active }) => (active ? "#89c799" : "#ffffff")};
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid rgba(0, 0, 0, 0.5);

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media screen and (min-width: 600px) {
    width: 100%;
    padding: 20px 10px;
  }
`;

export const AnswerIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f6fa;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  line-height: 0;
  font-weight: 700;
`;

export const AnswerText = styled.h3<Props>`
  color: #4a4747;
`;

export const ContinueButton = styled.button<Props>`
  border: none;
  background-color: transparent;
  width: 90%;
  padding: 10px;
  border-radius: 10px;
  text-transform: uppercase;
  border: 1px solid rgba(0, 0, 0, 0.5);

  color: #4a4747;
  font-weight: 800;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media screen and (min-width: 600px) {
    margin: 0 0 0 auto;
    width: 25%;
  }
`;

export const QuizCheckContainer = styled.div<Props>`
  width: 100%;
  margin: auto 0 0 0;
  background-color: ${({ checkType }) =>
    checkType === "correct"
      ? "#a6e3b6"
      : checkType === "incorrect"
      ? "#e3a6a7"
      : ""};
  display: flex;
  padding: 50px 40px;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 40px;
  @media screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

export const CheckedAnswerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const CheckedAnswerIcon = styled.div<Props>`
  height: 80px;
  width: 80px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ checkType }) =>
    checkType === "correct"
      ? "#89c799"
      : checkType === "incorrect"
      ? "#c78788"
      : ""};
`;

export const CheckedAnswerTextContainer = styled.div``;

export const CheckedAnswerTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
`;

export const CheckedAnswerText = styled.h2`
  font-size: 1.6rem;
`;

export const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  z-index: 10;
`;

export const Modal = styled.div<Props>`
  background-color: ${({ modalType }) =>
    modalType === "correct" ? "green" : "red"};
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 30%;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
  color: #ffffff;
`;
