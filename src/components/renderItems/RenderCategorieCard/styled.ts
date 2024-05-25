import styled from "styled-components";

type Props = {
  color?: string;
};

export const QuizCard = styled.div<Props>`
  display: flex;
  border-radius: 20px;
  border: 5px solid
    ${({ theme, color }) => (color ? color : theme.colors.main.default)};
  min-height: 80px;
  cursor: pointer;
  height: 2rem;
  width: 48%;
`;

export const QuizImage = styled.img`
  width: 20%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.main.secondary};
  border-radius: 20px 0 0 20px;
  object-fit: cover;
`;

export const QuizTitlesContainer = styled.div`
  width: 100%;
  padding: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StartButton = styled.div`
  font-weight: 600;
`;
