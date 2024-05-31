import React, { FC } from "react";
import * as Styled from "./styled";
import { TCategories } from "types/index";
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
    <Styled.QuizCard
      onClick={() => chosenCategory(item.title)}
      color={item.color}
    >
      <Styled.QuizTitlesContainer>
        <Title>{item.title}</Title>
        <Styled.StartButton>
          <Title size="small">Open</Title>
        </Styled.StartButton>
      </Styled.QuizTitlesContainer>
    </Styled.QuizCard>
  );
};

export default RenderCategoriesCard;
