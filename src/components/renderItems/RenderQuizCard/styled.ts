import styled from "styled-components";

type Props = {
  preview?: boolean;
};

export const QuizCard = styled.div<Props>`
  display: flex;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  height: 120px;
  cursor: ${({ preview }) => (preview ? "auto" : "pointer")};
  pointer-events: ${({ preview }) => (preview ? "none" : "all")};
  padding-right: 16px;
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

export const QuizImage = styled.img`
  width: 35%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.main.secondary};
  border-radius: 20px 0 0 20px;
  object-fit: cover;
  @media screen and (min-width: 600px) {
    width: 25%;
  }
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
