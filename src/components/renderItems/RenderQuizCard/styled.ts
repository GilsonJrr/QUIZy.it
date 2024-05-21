import styled from "styled-components";

type Props = {
  preview?: boolean;
};

export const QuizCard = styled.div<Props>`
  display: flex;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  min-height: 110px;
  cursor: ${({ preview }) => (preview ? "auto" : "pointer")};
  pointer-events: ${({ preview }) => (preview ? "none" : "all")};
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

export const QuizTitle = styled.h3`
  font-size: 1.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const QuizInfo = styled.h3`
  font-size: 1rem;
  font-weight: 400;
`;

export const StartButton = styled.div`
  position: absolute;
  bottom: 15px;
  right: 30px;
  font-weight: 600;
`;

export const Description = styled.p`
  width: 80%;
  margin-top: 5px;
  font-size: 0.9rem;
  max-height: 6em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-weight: 400;
`;
