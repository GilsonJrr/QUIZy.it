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
  height: 140px;
  width: 140px;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (min-width: 600px) {
    height: 120px;
    width: 120px;
  }
`;

export const ImageContainer = styled(CircularProgressbarWithChildren)`
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
  /* margin-top: -15px; */

  /* @media screen and (min-width: 600px) {
    width: 25%;
  } */
`;

export const QuizTitlesContainer = styled.div`
  width: 65%;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (min-width: 600px) {
    width: 75%;
  }
`;

export const StartButton = styled.div`
  bottom: 15px;
  right: 30px;
  font-weight: 600;
  margin: auto 0 10px 0;
`;
