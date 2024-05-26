import React, { FC, useState } from "react";
import Card from "components/Card";
import useDeviceType from "hooks/useDeviceType";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useTranslation } from "react-i18next";
import RenderQuizCard from "components/renderItems/RenderQuizCard";
import List from "components/List";
import { QuizTypeValues } from "Store/quiz/types";

type QuizzesCardProps = {};

const QuizzesCard: FC<QuizzesCardProps> = () => {
  const isMobile = useDeviceType();

  const { t } = useTranslation();
  const { quizzes, isLoading: quizLoading } = useSelector(
    (state: RootState) => state.quiz
  );

  const [search, setSearch] = useState<string>();
  const [filter, setFilter] = useState(false);

  return (
    <Card
      gridName="card1"
      title={isMobile ? "" : t("dashboard.allQuizzes")}
      isEmpty={quizzes?.length === 0}
      emptyMessage={t("dashboard.emptyNoQuiz")}
      scrollable
      searchable
      searchValue={search}
      setSearch={(e) => setSearch(e)}
      redirectTo={"Quizzes"}
      redirectPath="/quizzes"
      isLoading={quizLoading}
      innerCard={isMobile}
      setOrder={(order) => setFilter(order)}
    >
      <List<QuizTypeValues>
        content={quizzes || []}
        renderItem={(item) => <RenderQuizCard item={item} editMode />}
        search={search}
        filter={filter}
        itemKey={"title"}
        emptyState={t("dashboard.emptyQuiz")}
      />
    </Card>
  );
};

export default QuizzesCard;
