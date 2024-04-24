import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import * as Styled from "./styled";
import { Answer, EAnswerIndexation, QuestionFiltered } from "types";
import { randomize } from "utils";
import Modal from "components/Modal";
import { useLocation, useParams } from "react-router-dom";

// type QuizProps = {
//   amount: number;
//   category: number;
//   difficulty: "easy" | "medium" | "hard";
//   type: "multiple" | "boolean";
// };

const Quiz = () => {
  const location = useLocation();
  // const { category, difficulty, type } = useParams();

  const category = new URLSearchParams(location.search).get("category");
  const difficulty = new URLSearchParams(location.search).get("difficulty");
  const type = new URLSearchParams(location.search).get("type");

  const [questions, setQuestions] = useState<QuestionFiltered[]>();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>();
  const [showModal, setShowModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  console.log("questions", questions);

  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`
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
  }, [category, difficulty, type]);

  const handleAnswer = () => {
    selectedAnswer?.type === "correct" && setScore(score + 1);
    setShowModal(true);
  };

  const nextQuestion = () => {
    setShowModal(false);
    setSelectedAnswer(undefined);
    questions && current + 1 === questions?.length
      ? setShowScoreModal(true)
      : setCurrent(current + 1);
  };

  const finishQuiz = () => {
    setShowScoreModal(false);
  };

  if (!questions) {
    return <h1>Loading...</h1>;
  }

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Coins>200</Styled.Coins>
        <Styled.Title>Trivia Master</Styled.Title>
        <Styled.Close>X</Styled.Close>
      </Styled.Header>

      <Styled.ProgressContainer>
        <Styled.ProgressBar>
          <Styled.ProgressBarFill
            progress={questions && ((current + 1) / questions?.length) * 100}
          />
        </Styled.ProgressBar>
        <Styled.ProgressNumber>
          {current + 1}/{questions?.length}
        </Styled.ProgressNumber>
      </Styled.ProgressContainer>
      <Styled.Question>{questions?.[current]?.question}</Styled.Question>
      {questions?.[current]?.answers.map((answer, index: number) => {
        const active = answer.answer === selectedAnswer?.answer;
        return (
          <Styled.AnswerButton
            onClick={() => setSelectedAnswer(answer)}
            active={active}
          >
            <Styled.AnswerIndex>{EAnswerIndexation[index]}</Styled.AnswerIndex>
            <Styled.AnswerText active={active}>
              {answer.answer}
            </Styled.AnswerText>
          </Styled.AnswerButton>
        );
      })}
      <Styled.ContinueButton
        onClick={handleAnswer}
        disabled={!selectedAnswer}
        buttonType="primary"
      >
        Check
      </Styled.ContinueButton>
      <Modal
        action={nextQuestion}
        modalType={selectedAnswer?.type || ""}
        showModal={showModal}
        position="bottom"
      >
        <h2>{selectedAnswer?.type}!!</h2>
        <h3>
          {selectedAnswer?.type === "incorrect"
            ? `the right answer is: ${questions?.[current]?.correctAnswers}`
            : "Grate job "}
        </h3>
        <Styled.ContinueButton
          onClick={nextQuestion}
          disabled={!selectedAnswer}
        >
          Continue
        </Styled.ContinueButton>
      </Modal>

      <Modal
        action={finishQuiz}
        modalType={selectedAnswer?.type || ""}
        showModal={showScoreModal}
        position="center"
      >
        <h2>your score was !!</h2>
        <h3>{score}</h3>
        <Styled.ContinueButton
          onClick={nextQuestion}
          disabled={!selectedAnswer}
        >
          Finish
        </Styled.ContinueButton>
      </Modal>
    </Styled.Container>
  );
};

export default Quiz;
