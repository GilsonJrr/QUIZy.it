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

export const QuestionContainer = styled.div<Props>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  @media screen and (min-width: 600px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding: ${({ preview }) => (preview ? "" : "50px 60px 0")};
    gap: 50px;
    height: 100%;
    overflow-y: auto;
    height: 100%;
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
