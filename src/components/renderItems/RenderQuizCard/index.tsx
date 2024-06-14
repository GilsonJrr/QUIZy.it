import React, { FC } from "react";
import * as Styled from "./styled";
import { useModalContext } from "components/Modal/modalContext";
import PreQuizModal from "components/Modal/PreQuizModal";
import EmptyImage from "assets/images/Empty_quiz_image_state.png";
import { QuizTypeValues } from "Store/quiz/types";
import { Title } from "components/ui/Typography/styled";
import LoadingSpinner from "components/LoadingSpiner";
import { buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { theme } from "lib/styles/globalStyles";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { requestQuiz } from "Store/quiz/actions";

type RenderQuizCardProps = {
  item: QuizTypeValues;
  editMode?: boolean;
  preview?: boolean;
  loading?: boolean;
  onClick?: () => void;
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
  onClick,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { handleModal } = useModalContext();
  const { user, userStudent } = useSelector((state: RootState) => state.user);
  const { results } = useSelector((state: RootState) => state.result);

  const userType = user?.info?.userType || userStudent?.userType;

  const handleClick = () => {
    if (editMode) {
      onClick?.();
      dispatch(requestQuiz({ uid: user?.info?.uid || "", quizId: item.id }));
      return;
    }
    handleModal(<PreQuizModal item={item} />);
  };

  const studentResult: Result = Object.values(results || "").filter(
    (a) => a.quizUid === item?.id
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
          <Styled.CircularProgress
            value={
              notCompleted
                ? 0
                : (Number(studentResult?.score) /
                    Number(studentResult?.amount)) *
                  100
            }
            styles={buildStyles({
              pathColor: `${theme.colors.quiz.right}`,
            })}
          >
            <Styled.QuizImage src={item.image ? item.image : EmptyImage} />
          </Styled.CircularProgress>
        </Styled.ProgressContainer>
      ) : (
        <Styled.QuizImageTutor src={item.image ? item.image : EmptyImage} />
      )}
      <Styled.TextContainer>
        <Styled.QuizTitlesContainer>
          <Title>{item.title}</Title>
          <Title size="smaller" fontWeight="lighter" margin="2px 0 0 0">
            {item.category ? `${item.category} | ` : ""} {item.type}
          </Title>
          <Title size="smaller" fontWeight="lighter">
            {item.description}
          </Title>
        </Styled.QuizTitlesContainer>
        <Styled.StartButton>
          <Title size="small">
            {editMode
              ? t("components.renderItems.renderQuizCard.edit")
              : t("components.renderItems.renderQuizCard.start")}
          </Title>
        </Styled.StartButton>
      </Styled.TextContainer>
    </Styled.QuizCard>
  );
};

export default RenderQuizCard;
