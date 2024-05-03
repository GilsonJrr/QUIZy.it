import React, { FC } from "react";
import * as Styled from "./styled";
import { TCollection } from "types/index";
import { useNavigate } from "react-router-dom";

type RenderQuizCardProps = { item: TCollection };

const RenderQuizCard: FC<RenderQuizCardProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Styled.QuizCard
      onClick={() =>
        navigate(
          `/quiz?amount=3&category=${item.uid}&difficulty=${item.difficult}&type=${item.type}`
        )
      }
    >
      <Styled.QuizImage />
      <Styled.QuizTitlesContainer>
        <Styled.QuizTitle>{item.title}</Styled.QuizTitle>
        <Styled.QuizInfo>
          {item.difficult} | {item.type}
        </Styled.QuizInfo>
        <Styled.StartButton>Start</Styled.StartButton>
      </Styled.QuizTitlesContainer>
    </Styled.QuizCard>
  );
};

export default RenderQuizCard;
