import React, { FC } from "react";
import * as Styled from "./styled";
import { useModalContext } from "components/Modal/modalContext";
import PreQuizModal from "components/Modal/PreQuizModal";
import EmptyImage from "assets/images/Empty_quiz_image_state.png";
import { QuizTypeValues } from "Store/quiz/types";
import { useNavigate } from "react-router-dom";
import { Title } from "components/ui/Typography/styled";
import LoadingSpinner from "components/LoadingSpiner";
import { buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { theme } from "lib/styles/globalStyles";

type RenderQuizCardProps = {
  item: QuizTypeValues;
  editMode?: boolean;
  preview?: boolean;
  loading?: boolean;
};

type Result = {
  score: string;
  amount: string;
};

const RenderQuizCard: FC<RenderQuizCardProps> = ({
  item,
  editMode,
  preview,
  loading,
}) => {
  const navigate = useNavigate();

  const { handleModal } = useModalContext();
  const { user, userStudent } = useSelector((state: RootState) => state.user);

  const userType = user?.info?.userType || userStudent?.userType;

  const handleClick = () => {
    editMode
      ? navigate(`/quizzes/quiz-create?quizId=${item.id}`)
      : handleModal(<PreQuizModal item={item} />);
  };

  const studentResult: Result = Object.values(item?.results || "").filter(
    (a) => a.studentUid === userStudent?.uid
  )[0];

  const notCompleted =
    studentResult?.score === undefined && studentResult?.amount === undefined;

  return (
    <Styled.QuizCard
      onClick={handleClick}
      preview={preview}
      student={userType === "student"}
    >
      {loading ? (
        <Styled.LoaderContainer>
          <LoadingSpinner size="medium" />
        </Styled.LoaderContainer>
      ) : userType === "student" ? (
        <Styled.ProgressContainer>
          <Styled.ImageContainer
            value={
              notCompleted
                ? 0
                : (Number(studentResult?.score) /
                    Number(studentResult?.amount)) *
                  100
            }
            styles={buildStyles({
              pathColor: `${theme.colors.main.default}`,
            })}
          >
            <Styled.QuizImage src={item.image ? item.image : EmptyImage} />
          </Styled.ImageContainer>
        </Styled.ProgressContainer>
      ) : (
        <Styled.QuizImageTutor src={item.image ? item.image : EmptyImage} />
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
