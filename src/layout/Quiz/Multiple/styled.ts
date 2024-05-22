import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type Props = {
  progress?: number;
  active?: boolean;
  buttonType?: "primary" | "secondary";
  modalType?: string;
  checkType?: string;
  preview?: boolean;
  reverse?: boolean;
};

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

export const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow-y: scroll;

  @media screen and (min-width: 600px) {
    width: 50%;
  }
`;

export const Question = styled.h3`
  text-align: center;
  color: ${({ theme }) => theme.colors.main.default};
  margin-bottom: 30px;
  @media screen and (min-width: 600px) {
    width: 50%;
    text-align: top;
    font-size: 2rem;
    margin: 0 10px;
    margin-bottom: 0px;
    position: sticky;
    top: 0;
  }
`;

export const ProgressNumber = styled.h3``;

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

export const ButtonContent = styled.div<Props>`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
  width: 100%;
  gap: 15px;
  align-items: center;

  transition: 0.5s ease-in-out all;
`;

export const AnswerIndex = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.background.default : theme.colors.main.default};
  color: ${({ theme, active }) =>
    active ? theme.colors.main.default : theme.colors.background.default};
  height: 40px;
  width: 40px;
  border-radius: 100%;
  line-height: 0;
  font-weight: 700;
`;

export const CheckIcon = styled(FaCheck)`
  color: ${({ theme }) => theme.colors.quiz.right};
`;

export const CloseIcon = styled(IoClose)`
  color: ${({ theme }) => theme.colors.quiz.wrong};
`;

export const AnswerText = styled.h3<Props>`
  color: ${({ theme }) => theme.colors.main.default};
  width: 90%;
  text-align: left;
`;
