import React, { useEffect, useState } from "react";
// import * as Styled from "./styled";
import { QuestionFiltered } from "types";
import { randomize } from "utils";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { requestQuiz } from "Store/quiz/actions";
import QuizTemplate from "layout/Quiz/QuizTemplate";
import { LoadingContainerFullPage } from "components/Container/styled";
import LoadingSpinner from "components/LoadingSpiner";

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, userStudent } = useSelector(
    (state: RootState) => state.userReducer
  );
  const { quiz, isLoading } = useSelector(
    (state: RootState) => state.quizReducer
  );

  const quizID = new URLSearchParams(location.search).get("quizId");
  const userId = localStorage.getItem("userId");
  const userType = user?.info?.userType
    ? user?.info?.userType
    : userStudent?.userType || localStorage.getItem("userType");

  const [questions, setQuestions] = useState<QuestionFiltered[]>();

  const requestUid =
    userType === "tutor" ? userId || "" : userStudent?.tutorID || "";

  useEffect(() => {
    if (quizID && requestUid) {
      dispatch(requestQuiz({ uid: requestUid, quizId: quizID }));
    }
  }, [dispatch, quizID, requestUid]);

  useEffect(() => {
    setQuestions(
      quiz?.questions?.map((question: any) => {
        const multipleAnswers = [
          { id: 1, answer: question.answer01, type: "correct" },
          {
            id: 2,
            answer: question.answer02,
            type: "incorrect",
          },
          {
            id: 3,
            answer: question.answer03,
            type: "incorrect",
          },
          {
            id: 4,
            answer: question.answer04,
            type: "incorrect",
          },
        ];
        const trueOrFalseAnswers = [
          {
            id: 1,
            answer: question.rightAnswer.toString(),
            type: "correct",
          },
          {
            id: 1,
            answer: (!question.rightAnswer).toString(),
            type: "incorrect",
          },
        ];
        return {
          question: question.questionTitle,
          answers: randomize(
            quiz.type === "Multiple"
              ? multipleAnswers.filter((answer) => answer.answer !== "")
              : trueOrFalseAnswers
          ),
          correctAnswers: question.rightAnswer,
        };
      })
    );
  }, [quiz]);

  useEffect(() => {
    localStorage.setItem("lastQuiz", quiz?.id || "");
  }, [quiz?.id]);

  if (isLoading) {
    return (
      <LoadingContainerFullPage>
        <LoadingSpinner size="big" />
      </LoadingContainerFullPage>
    );
  }

  return (
    <QuizTemplate
      questions={questions || []}
      onClose={() => navigate("/quizzes")}
      quizId={quizID || ""}
    />
  );
};

export default Quiz;
