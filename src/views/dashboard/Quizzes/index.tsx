import React, { FC, useState } from "react";
import * as Styled from "./styled";
import Card from "components/Card";
import { easyQuizzes, hardQuizzes, mediumQuizzes } from "assets/consts";
import RenderQuizCard from "components/renderItems/RenderQuizCard";

import { GiCardRandom } from "react-icons/gi";
import { FaFastBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { randomQuiz } from "functions/index";
import RenderCategoriesCard from "components/renderItems/RenderCategorieCard";
import { TCategories } from "types/index";

type QuizzesProps = {};

const Quizzes: FC<QuizzesProps> = () => {
  const navigate = useNavigate();
  const lastQuiz = localStorage.getItem("lastQuiz") || "";

  const [category, setCategory] = useState("");

  const categories: TCategories[] = [
    { title: "History" },
    { title: "Geography" },
    { title: "General Knowledge" },
    { title: "Books" },
    { title: "Film" },
    { title: "Music" },
    { title: "Musicals & Theatres" },
    { title: "Television" },
    { title: "Video Games" },
  ];

  const Quizzes = [
    ...easyQuizzes.filter((quiz) => quiz.title === category),
    ...mediumQuizzes.filter((quiz) => quiz.title === category),
    ...hardQuizzes.filter((quiz) => quiz.title === category),
  ];

  return (
    <Styled.Container>
      <Styled.OptionButtonContainer>
        <Styled.OptionButton onClick={() => navigate(randomQuiz())}>
          <GiCardRandom size={40} />
          Radon Quiz
        </Styled.OptionButton>
        <Styled.OptionButton onClick={() => navigate(lastQuiz)}>
          <FaFastBackward size={40} />
          Retry last Quiz
        </Styled.OptionButton>
      </Styled.OptionButtonContainer>
      <Card
        gridName="card2"
        title="New Quizes"
        isEmpty={easyQuizzes && easyQuizzes.length < 0}
        emptyMessage={"No new quiz available at this time. Please check later"}
        scrollable
      >
        {easyQuizzes?.map((item) => {
          return <RenderQuizCard item={item} />;
        })}
      </Card>
      <Card
        gridName="card3"
        title={category ? category : "Categories"}
        isEmpty={categories.length === 0}
        emptyMessage={"No categories found. Please check later"}
        scrollable
      >
        {!category
          ? categories?.map((category) => {
              return (
                <RenderCategoriesCard
                  item={category}
                  chosenCategory={(category) => setCategory(category)}
                />
              );
            })
          : Quizzes?.map((item) => {
              return <RenderQuizCard item={item} />;
            })}
        {category && (
          <Styled.GoBackButton onClick={() => setCategory("")}>
            See all Categories
          </Styled.GoBackButton>
        )}
      </Card>
    </Styled.Container>
  );
};

export default Quizzes;
