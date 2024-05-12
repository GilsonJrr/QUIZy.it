import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";
import Card from "components/Card";
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
import { useDispatch } from "react-redux";
import { requestCategoryList } from "Store/category/actions";
import { requestQuizList, requestQuizListCategory } from "Store/quiz/actions";

type QuizzesProps = {};

const Quizzes: FC<QuizzesProps> = () => {
  const dispatch = useDispatch();
  const { user, userStudent } = useSelector(
    (state: RootState) => state.userReducer
  );
  const { student } = useSelector((state: RootState) => state.studentReducer);
  const { categories: cat } = useSelector(
    (state: RootState) => state.categoryReducer
  );
  const { quizzes, quizzesCategory } = useSelector(
    (state: RootState) => state.quizReducer
  );

  //TODO: lembrar que quando for estudante aqui ser chamado o id do tutor
  const userID = localStorage.getItem("userId");
  const userType = user?.info?.userType
    ? user?.info?.userType
    : student?.info?.userType || localStorage.getItem("userType");
  const requestUid =
    userType === "tutor" ? userID || "" : userStudent?.tutorID || "";

  const navigate = useNavigate();
  const lastQuiz = localStorage.getItem("lastQuiz") || "";

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState<string>();

  const categories: TCategories[] = [
    ...(cat && cat.length > 0
      ? cat?.map((c) => {
          return { title: c.title, image: c.image };
        })
      : []),
    { title: "No category" },
  ];

  const StudentOptions: TOptions[] = [
    {
      option: "Radon Quiz",
      optionIcon: <GiCardRandom size={40} />,
      onClick: () =>
        navigate(
          randomQuiz(
            quizzes?.length || 0,
            quizzes?.map((quiz) => quiz.id as string) || [""]
          )
        ),
    },
    {
      option: "Retry last Quiz",
      optionIcon: <FaFastBackward size={40} />,
      onClick: () => navigate(`/quiz?quizId=${lastQuiz}`),
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
      onClick: () => navigate("/quizzes/category-create"),
    },
  ];

  useEffect(() => {
    dispatch(requestCategoryList({ uid: requestUid }));
  }, [dispatch, requestUid]);

  const handleDisplayCategories = (category: string) => {
    setCategory(category);
    if (category === "No category") {
      return dispatch(
        requestQuizListCategory({ uid: requestUid, category: "categoryLess" })
      );
    }
    dispatch(requestQuizListCategory({ uid: requestUid, category: category }));
  };

  useEffect(() => {
    dispatch(requestQuizList({ uid: requestUid, size: 50 }));
  }, [dispatch, requestUid, userID]);

  console.log(
    "requestes x",
    quizzes?.map((quiz) => quiz.id)
  );

  return (
    <Styled.Container>
      <OptionsButton
        options={userType === "student" ? StudentOptions : TutorOptions}
        width="45%"
      />
      <Card
        gridName="card2"
        title={userType === "student" ? "New Quizzes" : "All Quizzes"}
        isEmpty={quizzes?.length === 0}
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
        {quizzes &&
          quizzes?.length > 0 &&
          quizzes?.map((item) => {
            return <RenderQuizCard item={item} />;
          })}
        <></>
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
                  chosenCategory={(category) =>
                    handleDisplayCategories(category)
                  }
                />
              );
            })
          : quizzesCategory?.map((item) => {
              console.log("item", item);
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
