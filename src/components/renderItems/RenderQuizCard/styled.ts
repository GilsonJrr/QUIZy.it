import styled from "styled-components";

type Props = {
  preview?: boolean;
};

export const QuizCard = styled.div<Props>`
  display: flex;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  min-height: 120px;
  cursor: ${({ preview }) => (preview ? "auto" : "pointer")};
  pointer-events: ${({ preview }) => (preview ? "none" : "all")};
  padding-right: 16px;
`;

export const QuizImage = styled.img`
  width: 25%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.main.secondary};
  border-radius: 20px 0 0 20px;
  object-fit: cover;
`;

export const QuizTitlesContainer = styled.div`
  width: 75%;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StartButton = styled.div`
  bottom: 15px;
  right: 30px;
  font-weight: 600;
  margin: auto 0 10px 0;
`;
