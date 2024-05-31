import styled from "styled-components";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

type Props = {
  preview?: boolean;
  student?: boolean;
};

export const QuizCard = styled.div<Props>`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  background-color: ${({ theme }) => theme.colors.background.default};
  cursor: ${({ preview }) => (preview ? "auto" : "pointer")};
  pointer-events: ${({ preview }) => (preview ? "none" : "all")};
  padding-right: 16px;
  border-radius: ${({ student }) =>
    student ? "100px 20px 20px 100px" : "20px"};
  height: 120px;
`;

export const LoaderContainer = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 600px) {
    width: 25%;
  }
`;

export const ProgressContainer = styled.div`
  height: 120px;
  width: 118px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const CircularProgress = styled(CircularProgressbarWithChildren)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 20000;
`;

export const QuizImageTutor = styled.img`
  width: 35%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.main.secondary};
  border-radius: 20px 0 0 20px;
  object-fit: cover;
  @media screen and (min-width: 600px) {
    width: 25%;
  }
`;

export const QuizImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 100%;
  position: absolute;
`;

export const QuizTitlesContainer = styled.div`
  width: 100%;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (min-width: 600px) {
    width: 85%;
  }
`;

export const StartButton = styled.div`
  display: none;
  @media screen and (min-width: 600px) {
    display: flex;
    bottom: 15px;
    right: 30px;
    font-weight: 600;
    margin: auto 0 10px 0;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  width: calc(100% - 120px);
  @media screen and (min-width: 600px) {
    width: calc(100% - 120px);
  }
`;
