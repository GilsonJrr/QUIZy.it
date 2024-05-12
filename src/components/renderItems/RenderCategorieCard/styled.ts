import styled from "styled-components";

export const QuizCard = styled.div`
  display: flex;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  min-height: 80px;
  cursor: pointer;
  height: 7rem;
`;

export const QuizImage = styled.img`
  width: 20%;
  height: 100%;
  background-color: #e6e6e6;
  border-radius: 20px 0 0 20px;
  object-fit: cover;
`;

export const QuizTitlesContainer = styled.div`
  width: 80%;
  padding: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const QuizTitle = styled.h3`
  font-size: 1.4rem;
`;

export const QuizInfo = styled.h3`
  font-size: 1rem;
  font-weight: 400;
`;

export const StartButton = styled.div`
  /* position: absolute;
  bottom: 15px;
  right: 30px; */
  font-weight: 600;
`;
