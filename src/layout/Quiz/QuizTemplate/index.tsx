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
import { Title } from "components/ui/Typography/styled";
import useDeviceType from "hooks/useDeviceType";

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
  const isMobile = useDeviceType();

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

  const quizTypeDisplay = () => {
    return (
      <>
        {(quiz?.type === "Multiple" ||
          quiz?.type === "TrueOrFalse" ||
          type === "Multiple" ||
          type === "TrueOrFalse") && (
          <Multiple
            title={questions?.[current]?.question}
            question={questions?.[current]}
            selectedAnswer={selectedAnswer?.answer as string}
            setSelectedAnswer={(answer) => setSelectedAnswer(answer)}
            showAnswer={showAnswer}
            preview={preview}
          />
        )}
        {(quiz?.type === "FillTheBlanks" || type === "FillTheBlanks") && (
          <FilTheBlanks
            questions={filTheBlanks?.[current]}
            setSelectedAnswer={(answer) => setSelectedAnswer(answer)}
            resetTrigger={resetTrigger}
          />
        )}
      </>
    );
  };

  if (preview) {
    return quizTypeDisplay();
  }

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
            <Title width={isMobile ? "18%" : "4%"} textAlign="right">
              {current + 1}/{questions?.length}
            </Title>
          </Styled.ProgressContainer>
        </Styled.Header>
        {quizTypeDisplay()}
      </Styled.QuizContainer>
      {!preview && (
        <Styled.QuizCheckContainer
          checkType={showAnswer ? selectedAnswer?.type : ""}
          display={showAnswer}
        >
          {showAnswer ? (
            selectedAnswer?.type === "incorrect" ? (
              <Styled.CheckedAnswerContainer display={showAnswer}>
                <Styled.CheckedAnswerIcon
                  display={showAnswer}
                  checkType={selectedAnswer?.type || ""}
                >
                  <IoClose size={isMobile ? 30 : 50} />
                </Styled.CheckedAnswerIcon>
                <Styled.CheckedAnswerTextContainer>
                  <Title size="big" multiLine color="light">
                    The right answer is:
                  </Title>
                  <Title multiLine color="light">
                    {selectedAnswer?.finalAnswer}
                  </Title>
                </Styled.CheckedAnswerTextContainer>
              </Styled.CheckedAnswerContainer>
            ) : (
              <Styled.CheckedAnswerContainer display={showAnswer}>
                <Styled.CheckedAnswerIcon
                  display={showAnswer}
                  checkType={selectedAnswer?.type || ""}
                >
                  <FaCheck size={isMobile ? 30 : 50} />
                </Styled.CheckedAnswerIcon>
                <Title size="big" color="light">
                  Grate job!
                </Title>
              </Styled.CheckedAnswerContainer>
            )
          ) : (
            <Styled.CheckedAnswerIcon checkType={""} display={showAnswer} />
          )}
          <Styled.ContinueButtonContainer display={showAnswer}>
            <Button
              onClick={
                showAnswer && showScore
                  ? finishQuiz
                  : showAnswer
                  ? nextQuestion
                  : handleAnswer
              }
              disabled={!selectedAnswer}
              partialDisabled
              width="100%"
              variant="secondary"
              align="center"
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
