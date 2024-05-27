import React, { FC, useState } from "react";
import * as Styled from "./styled";
import Card from "components/Card";
import useDeviceType from "hooks/useDeviceType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useTranslation } from "react-i18next";
import RenderQuizCard from "components/renderItems/RenderQuizCard";
import List from "components/List";
import { QuizTypeValues } from "Store/quiz/types";
import RenderCategoriesCard from "components/renderItems/RenderCategorieCard";
import Button from "components/Button";
import { requestQuizListCategory } from "Store/quiz/actions";

type CategoriesCardProps = {
  origin?: boolean;
  editMode?: boolean;
  gridName?: string;
};

const CategoriesCard: FC<CategoriesCardProps> = ({ editMode, gridName }) => {
  const isMobile = useDeviceType();
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { user, userStudent } = useSelector((state: RootState) => state.user);
  const { categories: cat, isLoading: categoryLoading } = useSelector(
    (state: RootState) => state.category
  );
  const { quizzesCategory, quizCategoryLoading } = useSelector(
    (state: RootState) => state.quiz
  );

  const userType = user?.info?.userType
    ? user?.info?.userType
    : userStudent?.userType;
  const userID = user?.info?.uid || userStudent?.uid;
  const requestUid =
    userType === "tutor" ? userID || "" : userStudent?.tutorID || "";

  const [search, setSearch] = useState<string>();
  const [filter, setFilter] = useState(true);
  const [category, setCategory] = useState("");

  const handleDisplayAllCategories = () => {
    setCategory("");
    setSearch("");
    setFilter(true);
  };

  const handleDisplayCategories = (category: string) => {
    setCategory(category);
    setSearch("");
    setFilter(true);
    if (category === t("quizzes.noCategory")) {
      return dispatch(
        requestQuizListCategory({ uid: requestUid, category: "categoryLess" })
      );
    }
    dispatch(requestQuizListCategory({ uid: requestUid, category: category }));
  };

  return (
    <Card
      gridName={gridName}
      title={category ? category : t("quizzes.categories")}
      isEmpty={false}
      scrollable
      isLoading={categoryLoading || quizCategoryLoading}
      innerCard={isMobile}
      setSearch={(e) => setSearch(e)}
      searchValue={search}
      searchable
      setOrder={(order) => setFilter(order)}
    >
      {!category ? (
        <List<QuizTypeValues>
          wrap
          content={cat || []}
          renderItem={(item) => (
            <RenderCategoriesCard
              item={item}
              chosenCategory={(category) => handleDisplayCategories(category)}
            />
          )}
          search={search}
          filter={filter}
          itemKey={"title"}
          emptyState={t("quizzes.noCategoriesFound")}
        />
      ) : (
        <List<QuizTypeValues>
          content={quizzesCategory || []}
          renderItem={(item) => (
            <RenderQuizCard item={item} editMode={editMode} />
          )}
          search={search}
          filter={filter}
          itemKey={"title"}
          emptyState={t("dashboard.emptyQuiz")}
        />
      )}
      {category && (
        <Styled.ButtonContainer>
          <Button onClick={handleDisplayAllCategories} width="100%">
            <Styled.ButtonText>
              {t("quizzes.seeAllCategories")}
            </Styled.ButtonText>
          </Button>
        </Styled.ButtonContainer>
      )}
    </Card>
  );
};

export default CategoriesCard;
