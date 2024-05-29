import styled from "styled-components";

type Props = {
  progress?: number;
  buttonType?: "primary" | "secondary";
  modalType?: string;
  checkType?: string;
  preview?: boolean;
  display?: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0px;
  width: 100%;
  height: 100%;

  @media screen and (min-width: 600px) {
    padding: 0px;
    overflow: hidden;
  }
`;

export const QuizContainer = styled.div<Props>`
  padding: 20px 15px 100px;
  @media screen and (min-width: 600px) {
    padding: ${({ preview }) => (preview ? 0 : 30)}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
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
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  padding: 5px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-weight: 800;
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
    height: 100%;
    overflow-y: scroll;
  }
`;

export const Close = styled.div`
  background-color: transparent;
  width: 10%;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media screen and (min-width: 600px) {
    height: 30px;
    width: 30px;
    background-color: ${({ theme }) => theme.colors.background.tertiary};
    border: 1px solid ${({ theme }) => theme.colors.main.default};
  }
`;

export const ProgressContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  text-align: left;

  button {
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
`;

export const AnswerIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.main.primary};
  height: 30px;
  width: 30px;
  border-radius: 100%;
  line-height: 0;
  font-weight: 700;
`;

export const ContinueButtonContainer = styled.div`
  bottom: 10px;
  padding: 0 0 25px 0px;
  width: 100%;
  @media screen and (min-width: 600px) {
    display: flex;
    padding: 25px 0px;
    justify-content: flex-end;
    right: 0;
    width: 30%;
    margin: 0 0 0 auto;
  }
`;

export const QuizCheckContainer = styled.div<Props>`
  width: 100%;
  margin: auto 0 0 0;
  background-color: ${({ checkType, theme }) =>
    checkType === "correct"
      ? theme.colors.quiz.rightSecondary
      : checkType === "incorrect"
      ? theme.colors.quiz.wrongPrimary
      : "transparent"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 40px;
  position: fixed;
  bottom: 0;
  padding: ${({ display }) =>
    display ? "50px 20px 20px" : "0 20px 20px 20px"};
  @media screen and (min-width: 600px) {
    flex-direction: row;
    padding: ${({ display }) => (display ? "50px 40px" : "0 40px 50px 40px")};
    pointer-events: none;

    button {
      pointer-events: all;
    }
  }
`;

export const CheckedAnswerContainer = styled.div<Props>`
  display: ${({ display }) => (display ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const CheckedAnswerIcon = styled.div<Props>`
  display: ${({ display }) => (display ? "flex" : "none")};
  height: 50px;
  width: 50px;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ checkType, theme }) =>
    checkType === "correct"
      ? theme.colors.quiz.right
      : checkType === "incorrect"
      ? theme.colors.quiz.wrong
      : ""};
  @media screen and (min-width: 600px) {
    height: 80px;
    width: 80px;
  }
`;

export const CheckedAnswerTextContainer = styled.div`
  width: 80%;
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
  color: ${({ theme }) => theme.colors.background.tertiary};
`;
