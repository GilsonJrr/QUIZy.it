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
import useDeviceType from "hooks/useDeviceType";
import Tabs from "components/Tabs";

type QuizzesProps = {};

const Quizzes: FC<QuizzesProps> = () => {
  const dispatch = useDispatch();
  const isMobile = useDeviceType();

  const { user, userStudent } = useSelector(
    (state: RootState) => state.userReducer
  );
  const { student } = useSelector((state: RootState) => state.studentReducer);
  const { categories: cat, isLoading: categoryLoading } = useSelector(
    (state: RootState) => state.categoryReducer
  );
  const {
    quizzes,
    quizzesCategory,
    isLoading: quizzesLoading,
    quizCategoryLoading,
  } = useSelector((state: RootState) => state.quizReducer);

  const [tab, setTab] = useState("Options");

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
    if (cat === undefined) {
      dispatch(requestCategoryList({ uid: requestUid }));
    }
  }, [dispatch, cat, requestUid]);

  useEffect(() => {
    if (quizzes === undefined) {
      dispatch(requestQuizList({ uid: requestUid, size: 50 }));
    }
  }, [dispatch, quizzes, requestUid, userID]);

  return (
    <Styled.Container>
      {isMobile && (
        <Styled.TabContainer>
          <Tabs
            tabs={[
              { label: "Options" },
              { label: "Quizzes" },
              { label: "Categories" },
            ]}
            activeTab={(tab) => setTab(tab)}
            radius={5}
          />
        </Styled.TabContainer>
      )}
      {(!isMobile || tab === "Options") && (
        <OptionsButton
          options={userType === "student" ? StudentOptions : TutorOptions}
          width="45%"
        />
      )}
      {(!isMobile || tab === "Quizzes") && (
        <Card
          gridName="card2"
          title={
            isMobile
              ? ""
              : userType === "student"
              ? "New Quizzes"
              : "All Quizzes"
          }
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
          isLoading={quizzesLoading}
          innerCard={isMobile}
        >
          {quizzes &&
            quizzes?.length > 0 &&
            quizzes?.map((item) => {
              return (
                <RenderQuizCard item={item} editMode={userType === "tutor"} />
              );
            })}
          <></>
        </Card>
      )}
      {(!isMobile || tab === "Categories") && (
        <Card
          gridName="card3"
          title={isMobile ? "" : category ? category : "Categories"}
          isEmpty={categories.length === 0}
          emptyMessage={"No categories found. Please check later"}
          scrollable
          isLoading={categoryLoading || quizCategoryLoading}
          innerCard={isMobile}
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
                return (
                  <RenderQuizCard item={item} editMode={userType === "tutor"} />
                );
              })}
          {category && (
            <Styled.GoBackButton onClick={() => setCategory("")}>
              See all Categories
            </Styled.GoBackButton>
          )}
        </Card>
      )}
    </Styled.Container>
  );
};

export default Quizzes;
