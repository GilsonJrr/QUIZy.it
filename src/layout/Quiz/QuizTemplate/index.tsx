import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";

import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Answer, EAnswerIndexation, QuestionFiltered } from "types/index";
import { useNavigate } from "react-router-dom";

type QuizTemplateProps = {
  onClose?: () => void;
  questions: QuestionFiltered[];
  quizId: string;
};

type TQuizResume = {
  question?: string;
  rightAnswer?: string;
  selectedAnswer?: string;
};

const QuizTemplate: FC<QuizTemplateProps> = ({
  onClose,
  questions,
  quizId,
}) => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>();
  const [showAnswer, setShowAnswer] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [quizResume, setQuizResume] = useState<TQuizResume[]>([]);

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

  const finishQuiz = () => {
    setShowScore(false);
    navigate("/quizResult", {
      state: {
        score: score,
        amount: questions?.length,
        quizResume: quizResume,
        quizId: quizId,
      },
    });
  };

  return (
    <Styled.Container>
      <Styled.QuizContainer>
        <Styled.Header>
          <Styled.Close onClick={onClose}>
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
            {questions?.[current]?.answers.map((answer: any, index: number) => {
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
                    {answer.answer || ""}
                  </Styled.AnswerText>
                </Styled.AnswerButton>
              );
            })}
          </Styled.OptionsContainer>
          {/* {children} */}
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

export default QuizTemplate;
