import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";
import BreadCrumbs from "components/BreadCrumbs";
import * as Block from "blocks/QuizCreate/index";
import { QuizRequest, QuizTypeValues } from "Store/quiz/types";
import { useDispatch } from "react-redux";
import { setQuiz } from "Store/quiz/actions";
import { useLocation, useNavigate } from "react-router-dom";

type QuizCreateProps = {};

const QuizCreate: FC<QuizCreateProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const quizId = new URLSearchParams(location.search).get("quizId");

  const [quizType, setQuizType] = useState<string>();

  const crumbs = [
    { label: "Quizzes", path: "/quizzes" },
    { label: quizId ? "Edit Quiz" : "Add Quiz", path: "" },
  ];

  const crumbsQuestion = [
    { label: "Quizzes", path: "/quizzes" },
    {
      label: quizId ? "Edit Quiz" : "Add Quiz",
      onClick: () => setQuizType(undefined),
      path: "",
    },
    { label: quizId ? "Edit Question" : "Add Question", path: "" },
  ];

  useEffect(() => {
    return () => {
      localStorage.setItem("preSendQuiz", "");
    };
  }, []);

  const handleSendQuiz = (quiz: QuizTypeValues) => {
    console.log("to be sent quiz", quiz);
    dispatch(setQuiz(quiz as QuizRequest));
    navigate("/quizzes");
  };

  return (
    <Styled.Container>
      <BreadCrumbs crumbs={!quizType ? crumbs : crumbsQuestion} />
      {!quizType && <Block.FormQuiz quizType={(e) => setQuizType(e)} />}
      {quizType === "Multiple" && (
        <Block.MultipleQuestion sendQuiz={(quiz) => handleSendQuiz(quiz)} />
      )}
      {quizType === "TrueOrFalse" && (
        <Block.TrueOrFalseQuestion sendQuiz={(quiz) => handleSendQuiz(quiz)} />
      )}
    </Styled.Container>
  );
};

export default QuizCreate;
