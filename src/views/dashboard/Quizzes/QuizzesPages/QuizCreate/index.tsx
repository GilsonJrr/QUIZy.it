import React, { FC } from "react";
import * as Styled from "./styled";
import BreadCrumbs from "components/BreadCrumbs";

type QuizCreateProps = {};

const QuizCreate: FC<QuizCreateProps> = () => {
  const crumbs = [
    { label: "Quizzes", path: "/quizzes" },
    { label: "Add Quiz", path: "/quizzes/quiz-create" },
  ];

  return (
    <Styled.Container>
      <BreadCrumbs crumbs={crumbs} />
    </Styled.Container>
  );
};

export default QuizCreate;
