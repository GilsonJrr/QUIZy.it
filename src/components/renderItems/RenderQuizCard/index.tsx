import React, { FC } from "react";
import * as Styled from "./styled";
import { TCollection } from "types/index";
import { useModalContext } from "components/Modal/modalContext";
import PreQuizModal from "components/Modal/PreQuizModal";

type RenderQuizCardProps = { item: TCollection };

const RenderQuizCard: FC<RenderQuizCardProps> = ({ item }) => {
  const { handleModal } = useModalContext();

  const renderModal = () => {
    return <PreQuizModal item={item} />;
  };

  return (
    <Styled.QuizCard onClick={() => handleModal(renderModal())}>
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
