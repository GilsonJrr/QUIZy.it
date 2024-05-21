import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";

import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Answer, QuestionFiltered, TResume } from "types/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setResult } from "Store/result/actions";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import ProgressBar from "components/ProgressBar";
import Button from "components/Button";
import { theme } from "lib/styles/globalStyles";
import Multiple from "../Multiple";
import { TFillTheBlanksQuestions } from "Store/quiz/types";
import FilTheBlanks from "../FilTheBlanks";

type QuizTemplateProps = {
  onClose?: () => void;
  questions?: QuestionFiltered[];
  filTheBlanks?: TFillTheBlanksQuestions[];
  quizId: string;
  preview?: boolean;
  type?: "Multiple" | "TrueOrFalse" | "FillTheBlanks";
};

const QuizTemplate: FC<QuizTemplateProps> = ({
  onClose,
  questions = [],
  filTheBlanks = [],
  quizId,
  preview,
  type,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { quiz } = useSelector((state: RootState) => state.quiz);
  const { student } = useSelector((state: RootState) => state.student);
  const [resetTrigger, setResetTrigger] = useState(false);

  const [current, setCurrent] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>();
  const [showAnswer, setShowAnswer] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [quizResume, setQuizResume] = useState<TResume[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);

  const handleAnswer = () => {
    selectedAnswer?.type === "correct" && setScore(score + 1);
    setShowAnswer(true);
    selectedAnswer?.resume &&
      setQuizResume([...quizResume, selectedAnswer?.resume]);
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
    setResetTrigger(!resetTrigger);
  };

  const finishQuiz = () => {
    setShowScore(false);
    const newResult = {
      tutorUid: student?.info?.tutorID || "",
      uid: student?.info?.tutorID || "",
      studentUid: student?.info?.uid || "",
      quizUid: quiz?.id,
      quizTitle: quiz?.title,
      quizCategory: quiz?.category,
      amount: questions?.length.toString(),
      score: score.toString(),
      resume: quizResume,
      date: Date.now(),
      studentName: student?.info?.name,
      timeSpent: timeSpent,
      tries: quiz?.results?.[(student?.info?.uid as any) ?? ""]?.tries
        ? quiz?.results?.[(student?.info?.uid as any) ?? ""]?.tries + 1
        : 1,
    };
    dispatch(setResult(newResult));
    navigate("/quizResult", {
      state: {
        score: score,
        amount: questions?.length,
        quizResume: quizResume,
        quizId: quizId,
      },
    });
  };

  useEffect(() => {
    if (!preview) {
      const incrementTime = () => {
        setTimeSpent((prevTime) => prevTime + 1);
      };
      const id = setInterval(incrementTime, 1000);
      return () => {
        clearInterval(id);
      };
    }
  });

  return (
    <Styled.Container>
      <Styled.QuizContainer preview={preview}>
        <Styled.Header>
          <Styled.Close onClick={onClose}>
            <IoClose size={20} />
          </Styled.Close>
          <Styled.ProgressContainer>
            <ProgressBar
              progress={questions && ((current + 1) / questions?.length) * 100}
              color={theme.colors.quiz.right}
              displayPercentage={false}
            />
            <Styled.ProgressNumber>
              {current + 1}/{questions?.length}
            </Styled.ProgressNumber>
          </Styled.ProgressContainer>
        </Styled.Header>
        {(quiz?.type === "Multiple" ||
          quiz?.type === "TrueOrFalse" ||
          type === "Multiple" ||
          type === "TrueOrFalse") && (
          <Multiple
            title={questions?.[current]?.question}
            question={questions?.[current]}
            selectedAnswer={selectedAnswer?.answer as string}
            setSelectedAnswer={(answer) => setSelectedAnswer(answer)}
          />
        )}
        {(quiz?.type === "FillTheBlanks" || type === "FillTheBlanks") && (
          <FilTheBlanks
            questions={filTheBlanks?.[current]}
            setSelectedAnswer={(answer) => setSelectedAnswer(answer)}
            resetTrigger={resetTrigger}
          />
        )}
      </Styled.QuizContainer>
      {!preview && (
        <Styled.QuizCheckContainer
          checkType={showAnswer ? selectedAnswer?.type : ""}
        >
          {showAnswer ? (
            selectedAnswer?.type === "incorrect" ? (
              <Styled.CheckedAnswerContainer>
                <Styled.CheckedAnswerIcon
                  checkType={selectedAnswer?.type || ""}
                >
                  <IoClose size={50} />
                </Styled.CheckedAnswerIcon>
                <Styled.CheckedAnswerTextContainer>
                  <Styled.CheckedAnswerTitle>
                    The right answer is:
                  </Styled.CheckedAnswerTitle>
                  <Styled.CheckedAnswerText>
                    {selectedAnswer?.finalAnswer}
                  </Styled.CheckedAnswerText>
                </Styled.CheckedAnswerTextContainer>
              </Styled.CheckedAnswerContainer>
            ) : (
              <Styled.CheckedAnswerContainer>
                <Styled.CheckedAnswerIcon
                  checkType={selectedAnswer?.type || ""}
                >
                  <FaCheck size={50} />
                </Styled.CheckedAnswerIcon>
                <Styled.CheckedAnswerText>Grate job!</Styled.CheckedAnswerText>
              </Styled.CheckedAnswerContainer>
            )
          ) : (
            <Styled.CheckedAnswerIcon checkType={""} />
          )}
          <Styled.ContinueButtonContainer>
            <Button
              onClick={
                showAnswer && showScore
                  ? finishQuiz
                  : showAnswer
                  ? nextQuestion
                  : handleAnswer
              }
              disabled={!selectedAnswer}
              width="100%"
              variant="secondary"
            >
              {showAnswer && showScore
                ? "Finish"
                : showAnswer
                ? "Continue"
                : "Check"}
            </Button>
          </Styled.ContinueButtonContainer>
        </Styled.QuizCheckContainer>
      )}
    </Styled.Container>
  );
};

export default QuizTemplate;
