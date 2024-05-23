import styled from "styled-components";

import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FaCircle } from "react-icons/fa6";

type Props = {
  right?: boolean;
  answer?: boolean;
  answerType?: "default" | "wrong" | "right";
};

export const Container = styled.div<Props>`
  background-color: ${({ theme }) => theme.colors.background.highlight};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: hidden;
  @media screen and (min-width: 600px) {
    padding: 30px 60px;
  }
`;

export const TitlesContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.main.default};
  display: flex;
  flex-direction: column-reverse;
  padding-bottom: 30px;
  @media screen and (min-width: 600px) {
    gap: 50px;
    flex-direction: row;
    padding-bottom: 0px;
  }
`;

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  @media screen and (min-width: 600px) {
    padding: 0 20px 30px;
    width: 50%;
  }
`;

export const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 600px) {
    padding: 0 20px 30px;
    width: 50%;
  }
`;

export const Label = styled.label`
  font-weight: 500;
  margin: 10px 0 3px;
`;

export const ScoreMessage = styled.p`
  text-align: left;
  padding: 0px;
  font-size: 0.8rem;
  font-weight: 500;
  @media screen and (min-width: 600px) {
    text-align: center;
    font-size: 1.5rem;
    text-align: left;
    font-weight: 600;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  margin: auto 0 0 0;
  @media screen and (min-width: 600px) {
    justify-content: flex-end;
  }
`;

export const ResumeContainer = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 50px;
  &:hover {
    overflow-y: scroll;
  }
`;

export const ResumeContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.main.default};
  align-items: flex-start;
`;

export const ResumeTextContainer = styled.div<Props>`
  display: flex;
  gap: 5px;
  background-color: ${({ answer, theme }) =>
    answer ? theme.colors.background.default : "transparent"};
  padding: ${({ answer }) => (answer ? "10" : "0")}px;
  border: ${({ answer }) => (answer ? "1" : "0")}px solid
    ${({ theme }) => theme.colors.main.default};
  border-radius: 4px;
  @media screen and (min-width: 600px) {
    align-items: center;
    flex-direction: row;
  }
`;

export const CheckIcon = styled(FaCheck)`
  color: ${({ theme }) => theme.colors.quiz.right};
`;

export const CloseIcon = styled(AiOutlineClose)`
  color: ${({ theme }) => theme.colors.quiz.wrong};
`;

export const CircleIcon = styled(FaCircle)<Props>`
  color: ${({ right, theme }) =>
    right ? theme.colors.quiz.right : theme.colors.quiz.wrong};
`;
