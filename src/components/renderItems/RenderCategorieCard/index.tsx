import React, { FC } from "react";
import * as Styled from "./styled";
import { TCategories } from "types/index";
import EmptyImage from "assets/images/Empty_quiz_image_state.png";
import { Title } from "components/ui/Typography/styled";

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
      <Styled.QuizImage src={item.image ? item.image : EmptyImage} />
      <Styled.QuizTitlesContainer>
        <Title>{item.title}</Title>
        <Styled.StartButton>Open</Styled.StartButton>
      </Styled.QuizTitlesContainer>
    </Styled.QuizCard>
  );
};

export default RenderCategoriesCard;
