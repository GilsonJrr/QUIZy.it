import React, { FC } from "react";
import * as Styled from "./styled";
import { useModalContext } from "components/Modal/modalContext";
import PreQuizModal from "components/Modal/PreQuizModal";
import EmptyImage from "assets/images/Empty_quiz_image_state.png";
import { QuizTypeValues } from "Store/quiz/types";
import { useNavigate } from "react-router-dom";
import { Title } from "components/ui/Typography/styled";
import LoadingSpinner from "components/LoadingSpiner";

type RenderQuizCardProps = {
  item: QuizTypeValues;
  editMode?: boolean;
  preview?: boolean;
  loading?: boolean;
};

const RenderQuizCard: FC<RenderQuizCardProps> = ({
  item,
  editMode,
  preview,
  loading,
}) => {
  const { handleModal } = useModalContext();
  const navigate = useNavigate();

  const handleClick = () => {
    editMode
      ? navigate(`/quizzes/quiz-create?quizId=${item.id}`)
      : handleModal(<PreQuizModal item={item} />);
  };

  return (
    <Styled.QuizCard onClick={handleClick} preview={preview}>
      {loading ? (
        <Styled.LoaderContainer>
          <LoadingSpinner size="medium" />
        </Styled.LoaderContainer>
      ) : (
        <Styled.QuizImage src={item.image ? item.image : EmptyImage} />
      )}
      <Styled.QuizTitlesContainer>
        <Title>{item.title}</Title>
        <Title size="smaller" fontWeight="lighter" margin="2px 0 0 0">
          {item.category ? `${item.category} | ` : ""} {item.type}
        </Title>
        <Title size="smaller" fontWeight="lighter">
          {item.description}
        </Title>
      </Styled.QuizTitlesContainer>
      <Styled.StartButton>{editMode ? "Edit" : "Start"}</Styled.StartButton>
    </Styled.QuizCard>
  );
};

export default RenderQuizCard;
