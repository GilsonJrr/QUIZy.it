import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";
import BreadCrumbs from "components/BreadCrumbs";
import * as Block from "blocks/QuizCreate/index";
import { QuizRequest, QuizTypeValues } from "Store/quiz/types";
import { useDispatch } from "react-redux";
import { setQuiz } from "Store/quiz/actions";
import { useNavigate } from "react-router-dom";

type QuizCreateProps = {};

const QuizCreate: FC<QuizCreateProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quizType, setQuizType] = useState<string>();

  const crumbs = [
    { label: "Quizzes", path: "/quizzes" },
    { label: "Add Quiz", path: "/quizzes/quiz-create" },
  ];

  const crumbsQuestion = [
    { label: "Quizzes", path: "/quizzes" },
    { label: "Add Quiz", onClick: () => setQuizType(undefined), path: "" },
    { label: "Add Question", path: "" },
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
