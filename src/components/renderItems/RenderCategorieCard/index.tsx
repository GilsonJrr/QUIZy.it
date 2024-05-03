import React, { FC } from "react";
import * as Styled from "./styled";
import { TCategories } from "types/index";

type RenderCategoriesCardProps = {
  item: TCategories;
  chosenCategory: (item: string) => void;
};

const RenderCategoriesCard: FC<RenderCategoriesCardProps> = ({
  item,
  chosenCategory,
}) => {
  return (
    <Styled.QuizCard onClick={() => chosenCategory(item.title)}>
      <Styled.QuizImage />
      <Styled.QuizTitlesContainer>
        <Styled.QuizTitle>{item.title}</Styled.QuizTitle>
        <Styled.StartButton>Open</Styled.StartButton>
      </Styled.QuizTitlesContainer>
    </Styled.QuizCard>
  );
};

export default RenderCategoriesCard;
