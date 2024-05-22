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
import Button from "components/Button";
import { useTranslation } from "react-i18next";

type QuizzesProps = {};

const Quizzes: FC<QuizzesProps> = () => {
  const dispatch = useDispatch();
  const isMobile = useDeviceType();
  const { t } = useTranslation();

  const { user, userStudent } = useSelector((state: RootState) => state.user);
  const { student } = useSelector((state: RootState) => state.student);
  const { categories: cat, isLoading: categoryLoading } = useSelector(
    (state: RootState) => state.category
  );
  const {
    quizzes,
    quizzesCategory,
    isLoading: quizzesLoading,
    quizCategoryLoading,
  } = useSelector((state: RootState) => state.quiz);

  const [tab, setTab] = useState(t("quizzes.options"));

  const userID = user?.info?.uid || userStudent?.uid;
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
    { title: t("quizzes.noCategory") },
  ];

  const StudentOptions: TOptions[] = [
    {
      option: t("quizzes.radonQuiz"),
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
      option: t("quizzes.retryLastQuiz"),
      optionIcon: <FaFastBackward size={40} />,
      onClick: () => navigate(`/quiz?quizId=${lastQuiz}`),
    },
  ];

  const TutorOptions: TOptions[] = [
    {
      option: t("quizzes.addQuiz"),
      optionIcon: <IoMdAddCircleOutline size={40} />,
      onClick: () => navigate("/quizzes/quiz-create"),
    },
    {
      option: t("quizzes.addCategory"),
      optionIcon: <MdPlaylistAddCheck size={40} />,
      onClick: () => navigate("/quizzes/category-create"),
    },
  ];

  const handleDisplayCategories = (category: string) => {
    setCategory(category);
    if (category === t("quizzes.noCategory")) {
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
              { label: t("quizzes.options") },
              { label: t("quizzes.quizzes") },
              { label: t("quizzes.categories") },
            ]}
            activeTab={(tab) => setTab(tab)}
            radius={5}
          />
        </Styled.TabContainer>
      )}
      {(!isMobile || tab === t("quizzes.options")) && (
        <OptionsButton
          options={userType === "student" ? StudentOptions : TutorOptions}
          width="45%"
        />
      )}
      {(!isMobile || tab === t("quizzes.quizzes")) && (
        <Card
          gridName="card2"
          title={
            isMobile
              ? ""
              : userType === "student"
              ? t("quizzes.newQuizzes")
              : t("quizzes.allQuizzes")
          }
          isEmpty={quizzes?.length === 0}
          emptyMessage={
            search ? t("quizzes.quizNotFound") : t("quizzes.noNewQuizAvailable")
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
        </Card>
      )}
      {(!isMobile || tab === t("quizzes.categories")) && (
        <Card
          gridName="card3"
          title={isMobile ? "" : category ? category : t("quizzes.categories")}
          isEmpty={categories.length === 0}
          emptyMessage={t("quizzes.noCategoriesFound")}
          scrollable
          isLoading={categoryLoading || quizCategoryLoading}
          innerCard={isMobile}
        >
          {!category ? (
            categories?.map((category) => {
              return (
                <RenderCategoriesCard
                  item={category}
                  chosenCategory={(category) =>
                    handleDisplayCategories(category)
                  }
                />
              );
            })
          ) : quizzesCategory?.length === 0 ? (
            <Styled.EmptyContainer>
              <Styled.EmptyText>
                {t("quizzes.noQuizFoundInCategory")}
              </Styled.EmptyText>
            </Styled.EmptyContainer>
          ) : (
            quizzesCategory?.map((item) => {
              return (
                <RenderQuizCard item={item} editMode={userType === "tutor"} />
              );
            })
          )}
          {category && (
            <Styled.ButtonContainer>
              <Button onClick={() => setCategory("")} width="100%">
                <Styled.ButtonText>
                  {t("quizzes.seeAllCategories")}
                </Styled.ButtonText>
              </Button>
            </Styled.ButtonContainer>
          )}
        </Card>
      )}
    </Styled.Container>
  );
};

export default Quizzes;
