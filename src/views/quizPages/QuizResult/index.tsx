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
import { formatTime } from "utils/index";
import { TResume } from "types/index";
import { AnswerText, Title } from "components/ui/Typography/styled";

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
    allInfo,
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
          {userType === "tutor" && (
            <>
              <Title size="smaller">Student</Title>
              <Styled.ScoreMessage>{studentName}</Styled.ScoreMessage>
            </>
          )}
          <Title size="smaller">Quiz</Title>
          <Styled.ScoreMessage>{quiz?.title}</Styled.ScoreMessage>
          <Title size="smaller">Quiz Info</Title>
          <Styled.ScoreMessage>
            {quiz?.type} | {quiz?.category}
          </Styled.ScoreMessage>
          <Title size="smaller">Final score</Title>
          <ProgressBar progress={finalScore} radius={5} />
        </Styled.InfoContainer>
        {userType === "student" ? (
          <Styled.MessageContainer>
            <Title size="smaller">FeedBack</Title>
            <Styled.ScoreMessage>{handleMessage()}</Styled.ScoreMessage>
          </Styled.MessageContainer>
        ) : (
          <Styled.InfoContainer>
            <Title size="smaller">Time spent</Title>
            <Styled.ScoreMessage>
              {formatTime(allInfo?.timeSpent)}
            </Styled.ScoreMessage>
            <Title size="smaller">Tries</Title>
            <Styled.ScoreMessage>{allInfo?.tries}</Styled.ScoreMessage>
          </Styled.InfoContainer>
        )}
      </Styled.TitlesContainer>
      <Styled.ResumeContainer>
        {quizResume?.map((res: TResume) => {
          return (
            <Styled.ResumeContainerInner>
              {quiz?.type !== "FillTheBlanks" && (
                <Styled.ResumeTextContainer>
                  {res.rightAnswer === res.selectedAnswer ? (
                    <Styled.CheckIcon size={20} />
                  ) : (
                    <Styled.CloseIcon size={25} />
                  )}
                  <h3>{res.question}</h3>
                </Styled.ResumeTextContainer>
              )}
              {quiz?.type === "FillTheBlanks" ? (
                <Styled.ResumeTextContainer answer>
                  {res.selectedFillAnswer?.some(
                    (a: any) => a.type === "wrong"
                  ) ? (
                    <>
                      <Styled.CircleIcon right={false} />
                      Your answer:
                      {res.selectedFillAnswer.map((a) => {
                        return (
                          <div>
                            {a.type === "default" ? (
                              <AnswerText answerType={"default"}>
                                {a.value}
                              </AnswerText>
                            ) : a.type === "wrong" ? (
                              <AnswerText answerType={"wrong"}>
                                {a.selectedValue === ""
                                  ? "        "
                                  : a.selectedValue}
                              </AnswerText>
                            ) : (
                              <AnswerText answerType={"right"}>
                                {a.selectedValue}
                              </AnswerText>
                            )}
                          </div>
                        );
                      })}
                      Right answer:
                    </>
                  ) : (
                    <Styled.CircleIcon right size={16} />
                  )}
                  {res?.selectedFillAnswer?.map((a) => {
                    return (
                      <div>
                        {a.type === "default" ? (
                          <AnswerText answerType={"default"}>
                            {a.value}
                          </AnswerText>
                        ) : a.type === "wrong" ? (
                          <AnswerText answerType={"right"}>
                            {a.value}
                          </AnswerText>
                        ) : (
                          <AnswerText answerType={"right"}>
                            {a.value}
                          </AnswerText>
                        )}
                      </div>
                    );
                  })}
                </Styled.ResumeTextContainer>
              ) : (
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
              )}
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
