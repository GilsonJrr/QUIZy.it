import React, { FC } from "react";
import * as Styled from "./styled";
import { useModalContext } from "components/Modal/modalContext";
import PreQuizModal from "components/Modal/PreQuizModal";
import EmptyImage from "assets/images/Empty_quiz_image_state.png";
import { QuizTypeValues } from "Store/quiz/types";

type RenderQuizCardProps = { item: QuizTypeValues; editMode?: boolean };

const RenderQuizCard: FC<RenderQuizCardProps> = ({ item, editMode }) => {
  const { handleModal } = useModalContext();

  return (
    <Styled.QuizCard onClick={() => handleModal(<PreQuizModal item={item} />)}>
      <Styled.QuizImage src={item.image ? item.image : EmptyImage} />
      <Styled.QuizTitlesContainer>
        <Styled.QuizTitle>{item.title}</Styled.QuizTitle>
        <Styled.QuizInfo>
          {item.category ? `${item.category} | ` : ""} {item.type}
        </Styled.QuizInfo>
        <Styled.Description>{item.description}</Styled.Description>
        <Styled.StartButton>{editMode ? "Edit" : "Start"}</Styled.StartButton>
      </Styled.QuizTitlesContainer>
    </Styled.QuizCard>
  );
};

export default RenderQuizCard;
