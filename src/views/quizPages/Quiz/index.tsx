import React, { useEffect, useState } from "react";
import axios from "axios";
import he from "he";
import * as Styled from "./styled";
import { Answer, EAnswerIndexation, QuestionFiltered } from "types";
import { randomize } from "utils";
import { useLocation, useNavigate } from "react-router-dom";

import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const category = new URLSearchParams(location.search).get("category");
  const difficulty = new URLSearchParams(location.search).get("difficulty");
  const type = new URLSearchParams(location.search).get("type");
  const amount = new URLSearchParams(location.search).get("amount");

  const [questions, setQuestions] = useState<QuestionFiltered[]>();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>();
  const [showAnswer, setShowAnswer] = useState(false);
  const [showScore, setShowScore] = useState(false);

  console.log("questions", questions);

  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
      )
      .then((data: any) => {
        setQuestions(
          data.data.results.map((quiz: any) => {
            return {
              question: quiz.question,
              answers: randomize([
                { id: 1, answer: quiz.correct_answer, type: "correct" },
                {
                  id: 2,
                  answer: quiz.incorrect_answers[0],
                  type: "incorrect",
                },
                {
                  id: 3,
                  answer: quiz.incorrect_answers[1],
                  type: "incorrect",
                },
                {
                  id: 4,
                  answer: quiz.incorrect_answers[2],
                  type: "incorrect",
                },
              ]),
              correctAnswers: quiz.correct_answer,
            };
          })
        );
      })
      .catch((err) => console.error(err));
  }, [amount, category, difficulty, type]);

  useEffect(() => {
    localStorage.setItem("lastQuiz", `${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  const handleAnswer = () => {
    selectedAnswer?.type === "correct" && setScore(score + 1);
    setShowAnswer(true);
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
        amount: amount,
        quiz: {
          category: category,
          difficulty: difficulty,
          type: type,
          amount: amount,
        },
      },
    });
  };

  if (!questions) {
    return <h1>Loading...</h1>;
  }

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
          <Styled.Question>
            {DecodedText(questions?.[current]?.question)}
          </Styled.Question>
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
