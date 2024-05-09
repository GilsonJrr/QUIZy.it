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
import { TCategories, TOptions } from "types/index";
import OptionsButton from "components/OptionsButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdPlaylistAddCheck } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";

type QuizzesProps = {};

const Quizzes: FC<QuizzesProps> = () => {
  const { user, userStudent } = useSelector(
    (state: RootState) => state.userReducer
  );
  const userType = user?.info?.userType
    ? user?.info?.userType
    : userStudent?.info?.userType;
  const navigate = useNavigate();
  const lastQuiz = localStorage.getItem("lastQuiz") || "";

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState<string>();

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

  const StudentOptions: TOptions[] = [
    {
      option: "Radon Quiz",
      optionIcon: <GiCardRandom size={40} />,
      onClick: () => navigate(randomQuiz()),
    },
    {
      option: "Retry last Quiz",
      optionIcon: <FaFastBackward size={40} />,
      onClick: () => navigate(lastQuiz),
    },
  ];

  const TutorOptions: TOptions[] = [
    {
      option: "Add Quiz",
      optionIcon: <IoMdAddCircleOutline size={40} />,
      onClick: () => navigate("/quizzes/quiz-create"),
    },
    {
      option: "Add category",
      optionIcon: <MdPlaylistAddCheck size={40} />,
      // onClick: () => navigate(lastQuiz),
    },
  ];

  const allQuizzes = [...easyQuizzes, ...mediumQuizzes, ...hardQuizzes].filter(
    (e) => e.title.toUpperCase().includes(search?.toUpperCase() || "")
  );

  return (
    <Styled.Container>
      <OptionsButton
        options={userType === "student" ? StudentOptions : TutorOptions}
        width="45%"
      />
      <Card
        gridName="card2"
        //TODO: mudar para new Quizzes para os alunos
        title={userType === "student" ? "New Quizzes" : "All Quizes"}
        isEmpty={allQuizzes && allQuizzes.length === 0}
        emptyMessage={
          search
            ? "Quiz not found"
            : "No new quiz available at this time. Please check later"
        }
        scrollable
        searchable
        searchValue={search}
        setSearch={(e) => setSearch(e)}
      >
        {allQuizzes?.map((item) => {
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
