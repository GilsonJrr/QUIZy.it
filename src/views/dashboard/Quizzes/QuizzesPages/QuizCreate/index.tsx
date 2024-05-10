import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";
import BreadCrumbs from "components/BreadCrumbs";
import * as Block from "blocks/QuizCreate/index";

type QuizCreateProps = {};

const QuizCreate: FC<QuizCreateProps> = () => {
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

  return (
    <Styled.Container>
      <BreadCrumbs crumbs={!quizType ? crumbs : crumbsQuestion} />
      {!quizType && <Block.FormQuiz quizType={(e) => setQuizType(e)} />}
      {quizType === "Multiple" && <Block.MultipleQuestion />}
      {quizType === "TrueOrFalse" && <Block.TrueOrFalseQuestion />}
    </Styled.Container>
  );
};

export default QuizCreate;
