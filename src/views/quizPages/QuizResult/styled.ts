import styled from "styled-components";

import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FaCircle } from "react-icons/fa6";

type Props = {
  right?: boolean;
  answer?: boolean;
};

export const Container = styled.div<Props>`
  background-color: #d9dadb;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 30px 60px;
  overflow: hidden;
`;

export const TitlesContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  display: flex;
  gap: 50px;
`;

export const InfoContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 0 20px 30px;
`;

export const MessageContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  margin: 0;
`;

export const Label = styled.label`
  font-weight: 500;
  margin: 10px 0 3px;
`;

export const Score = styled.h2`
  border-radius: 100%;
  font-size: 8rem;
  font-weight: 800;
  margin: 0;
  @media screen and (min-width: 600px) {
    font-size: 10rem;
  }
`;

export const ScoreMessage = styled.p`
  text-align: center;
  padding: 0 30px;
  font-size: 0.8rem;
  font-weight: 500;
  @media screen and (min-width: 600px) {
    /* width: 40%; */
    font-size: 1.5rem;
    text-align: left;
    font-weight: 600;
    padding: 0;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 20px;
  margin: auto 0 0 0;
`;

export const Button = styled.button`
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.5);
  outline: none;
  border-radius: 20px;
  padding: 15px 40px;

  font-size: 1.2rem;
  font-weight: 500;

  cursor: pointer;
`;

export const ResumeContainer = styled.div`
  overflow-y: hidden;
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  align-items: flex-start;
`;

export const ResumeTextContainer = styled.div<Props>`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: ${({ answer }) => (answer ? "#f8f8f8" : "transparent")};
  padding: ${({ answer }) => (answer ? "10" : "0")}px;
  border: ${({ answer }) => (answer ? "1" : "0")}px solid rgba(0, 0, 0, 0.4);
  border-radius: 4px;
`;

export const CheckIcon = styled(FaCheck)`
  color: #89c799;
`;

export const CloseIcon = styled(AiOutlineClose)`
  color: #c78788;
`;

export const CircleIcon = styled(FaCircle)<Props>`
  color: ${({ right }) => (right ? "#89c799" : "#c78788")};
`;
