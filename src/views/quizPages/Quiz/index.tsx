import React, { useEffect, useState } from "react";
import he from "he";
import * as Styled from "./styled";
import { Answer, EAnswerIndexation, QuestionFiltered } from "types";
import { randomize } from "utils";
import { useLocation, useNavigate } from "react-router-dom";

import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { requestQuiz } from "Store/quiz/actions";

type TQuizResume = {
  question?: string;
  rightAnswer?: string;
  selectedAnswer?: string;
};

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quiz } = useSelector((state: RootState) => state.quizReducer);

  const quizID = new URLSearchParams(location.search).get("quizId");
  const userId = localStorage.getItem("userId");

  const [questions, setQuestions] = useState<QuestionFiltered[]>();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>();
  const [showAnswer, setShowAnswer] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const [quizResume, setQuizResume] = useState<TQuizResume[]>([]);

  // console.log("questions", questions);

  useEffect(() => {
    if (quizID && userId) {
      dispatch(requestQuiz({ uid: userId, quizId: quizID }));
    }
  }, [dispatch, quizID, userId]);

  useEffect(() => {
    setQuestions(
      quiz?.questions?.map((quiz: any) => {
        const answers = [
          { id: 1, answer: quiz.answer01, type: "correct" },
          {
            id: 2,
            answer: quiz.answer02,
            type: "incorrect",
          },
          {
            id: 3,
            answer: quiz.answer03,
            type: "incorrect",
          },
          {
            id: 4,
            answer: quiz.answer04,
            type: "incorrect",
          },
        ];
        return {
          question: quiz.questionTitle,
          answers: randomize(answers.filter((answer) => answer.answer !== "")),
          correctAnswers: quiz.rightAnswer,
        };
      })
    );
  }, [quiz?.questions]);

  useEffect(() => {
    localStorage.setItem("lastQuiz", `${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  const handleAnswer = () => {
    selectedAnswer?.type === "correct" && setScore(score + 1);
    setShowAnswer(true);
    setQuizResume([
      ...quizResume,
      {
        question: questions?.[current]?.question,
        rightAnswer: questions?.[current]?.correctAnswers,
        selectedAnswer: selectedAnswer?.answer,
      },
    ]);
  };

  useEffect(() => {
    current + 1 === questions?.length && setShowScore(true);
  }, [current, questions?.length]);

  const nextQuestion = () => {
    setShowAnswer(false);
    setSelectedAnswer(undefined);
    questions && current + 1 === questions?.length
      ? setShowScore(true)
      : setCurrent(current + 1);
  };

  console.log("questions", current + 1, questions?.length, showScore);

  const DecodedText = (text: string) => {
    const decodedText = he.decode(text);

    return decodedText;
  };

  const finishQuiz = () => {
    setShowScore(false);
    navigate("/quizResult", {
      state: {
        score: score,
        amount: quiz?.questions?.length,
      },
    });
  };

  // if (!questions) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <Styled.Container>
      <Styled.QuizContainer>
        <Styled.Header>
          <Styled.Close onClick={() => navigate(-1)}>
            <IoClose size={20} />
          </Styled.Close>
          <Styled.ProgressContainer>
            <Styled.ProgressBar>
              <Styled.ProgressBarFill
                progress={
                  questions && ((current + 1) / questions?.length) * 100
                }
              />
            </Styled.ProgressBar>
            <Styled.ProgressNumber>
              {current + 1}/{questions?.length}
            </Styled.ProgressNumber>
          </Styled.ProgressContainer>
        </Styled.Header>
        <Styled.QuestionContainer>
          <Styled.Question>{questions?.[current]?.question}</Styled.Question>
          <Styled.OptionsContainer>
            {questions?.[current]?.answers.map((answer, index: number) => {
              const active = answer.answer === selectedAnswer?.answer;
              return (
                <Styled.AnswerButton
                  onClick={() => setSelectedAnswer(answer)}
                  active={active}
                  disabled={showAnswer}
                >
                  <Styled.AnswerIndex>
                    {EAnswerIndexation[index]}
                  </Styled.AnswerIndex>
                  <Styled.AnswerText active={active}>
                    {DecodedText(answer.answer || "")}
                  </Styled.AnswerText>
                </Styled.AnswerButton>
              );
            })}
          </Styled.OptionsContainer>
        </Styled.QuestionContainer>
      </Styled.QuizContainer>

      <Styled.QuizCheckContainer
        checkType={showAnswer ? selectedAnswer?.type : ""}
      >
        {showAnswer ? (
          selectedAnswer?.type === "incorrect" ? (
            <Styled.CheckedAnswerContainer>
              <Styled.CheckedAnswerIcon checkType={selectedAnswer?.type || ""}>
                <IoClose size={50} />
              </Styled.CheckedAnswerIcon>
              <Styled.CheckedAnswerTextContainer>
                <Styled.CheckedAnswerTitle>
                  The right answer is:
                </Styled.CheckedAnswerTitle>
                <Styled.CheckedAnswerText>
                  {questions?.[current]?.correctAnswers}!
                </Styled.CheckedAnswerText>
              </Styled.CheckedAnswerTextContainer>
            </Styled.CheckedAnswerContainer>
          ) : (
            <Styled.CheckedAnswerContainer>
              <Styled.CheckedAnswerIcon checkType={selectedAnswer?.type || ""}>
                <FaCheck size={50} />
              </Styled.CheckedAnswerIcon>
              <Styled.CheckedAnswerText>Grate job!</Styled.CheckedAnswerText>
            </Styled.CheckedAnswerContainer>
          )
        ) : (
          <Styled.CheckedAnswerIcon checkType={""} />
        )}
        <Styled.ContinueButton
          onClick={
            showAnswer && showScore
              ? finishQuiz
              : showAnswer
              ? nextQuestion
              : handleAnswer
          }
          disabled={!selectedAnswer}
          buttonType="primary"
        >
          {showAnswer && showScore
            ? "Finish"
            : showAnswer
            ? "Continue"
            : "Check"}
        </Styled.ContinueButton>
      </Styled.QuizCheckContainer>
    </Styled.Container>
  );
};

export default Quiz;
