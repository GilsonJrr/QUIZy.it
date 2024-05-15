import React, { FC, useEffect } from "react";
import * as Styled from "./styled";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { requestQuiz } from "Store/quiz/actions";
import { LoadingContainerFullPage } from "components/Container/styled";
import LoadingSpinner from "components/LoadingSpiner";
import ProgressBar from "components/ProgressBar";
import Button from "components/Button";

type QuizResultProps = {};

const QuizResult: FC<QuizResultProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, userStudent } = useSelector((state: RootState) => state.user);
  const { quiz, isLoading } = useSelector((state: RootState) => state.quiz);

  const userType = user?.info?.userType || userStudent?.userType;

  const {
    score = 0,
    amount = 0,
    quizResume,
    quizId,
    studentName,
  } = location.state || "";
  const finalScore = (score * 100) / amount;

  const handleResults = () => {
    navigate("/results");
  };

  const handleMessage = () => {
    switch (true) {
      case finalScore <= 30:
        return `Uh-oh! It appears there's a bit of a stumble here. But fret not! Every 
                misstep is just another opportunity to learn and grow. Take a breather, 
                review the material, and gear up for round two!`;
      case finalScore <= 50:
        return `Not quite there yet, but hey, progress is progress! Keep your chin up and 
                your determination strong. Reflect on what you've encountered, regroup, 
                and charge ahead with renewed vigor!`;
      case finalScore <= 80:
        return `You're making strides, but there's still a bit more ground to cover. Don't 
                let this deter you; instead, let it fuel your determination. Keep pushing 
                forward, keep striving for excellence. You're closer than you think!`;
      case finalScore === 100:
        return `Bravo! You absolutely aced it! Perfect score, perfect performance! Your 
                unwavering dedication and hard work have truly paid off. Keep shining brightly 
                and tackling challenges with that unbeatable spirit!`;
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(requestQuiz({ uid: user?.info?.uid || "", quizId: quizId }));
    }
  }, [dispatch, quizId, user]);

  if (isLoading) {
    return (
      <LoadingContainerFullPage>
        <LoadingSpinner size="big" />
      </LoadingContainerFullPage>
    );
  }

  return (
    <Styled.Container>
      <Styled.TitlesContainer>
        <Styled.InfoContainer>
          <Styled.Label>Student</Styled.Label>
          <Styled.ScoreMessage>{studentName}</Styled.ScoreMessage>
          <Styled.Label>Quiz</Styled.Label>
          <Styled.ScoreMessage>{quiz?.title}</Styled.ScoreMessage>
          <Styled.Label>Quiz Info</Styled.Label>
          <Styled.ScoreMessage>
            {quiz?.type} | {quiz?.category}
          </Styled.ScoreMessage>
          <Styled.Label>Final score</Styled.Label>
          <ProgressBar progress={finalScore} radius={5} />
        </Styled.InfoContainer>
        {userType === "student" && (
          <Styled.MessageContainer>
            <Styled.Label>FeedBack</Styled.Label>
            <Styled.ScoreMessage>{handleMessage()}</Styled.ScoreMessage>
          </Styled.MessageContainer>
        )}
      </Styled.TitlesContainer>
      <Styled.ResumeContainer>
        {quizResume?.map((res: any) => {
          return (
            <Styled.ResumeContainerInner>
              <Styled.ResumeTextContainer>
                {res.rightAnswer === res.selectedAnswer ? (
                  <Styled.CheckIcon size={20} />
                ) : (
                  <Styled.CloseIcon size={25} />
                )}
                <h3>{res.question}</h3>
              </Styled.ResumeTextContainer>
              <Styled.ResumeTextContainer answer>
                {res.rightAnswer === res.selectedAnswer ? (
                  <Styled.CircleIcon right size={16} />
                ) : (
                  <>
                    <Styled.CircleIcon right={false} />
                    Your answer: <h4>{res.selectedAnswer}</h4> Right answer:
                  </>
                )}
                <h4>{res.rightAnswer}</h4>
              </Styled.ResumeTextContainer>
            </Styled.ResumeContainerInner>
          );
        })}
      </Styled.ResumeContainer>
      {userType === "student" ? (
        <Styled.ButtonContainer>
          <Button onClick={() => navigate(-1)} variant="secondary">
            Retry
          </Button>
          <Button onClick={handleResults}>Go to results</Button>
        </Styled.ButtonContainer>
      ) : (
        <Styled.ButtonContainer>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </Styled.ButtonContainer>
      )}
    </Styled.Container>
  );
};

export default QuizResult;
