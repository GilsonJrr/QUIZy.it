import React, { FC, useState } from "react";
import Card from "components/Card";
import useDeviceType from "hooks/useDeviceType";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useTranslation } from "react-i18next";
import RenderQuizCard from "components/renderItems/RenderQuizCard";
import List from "components/List";
import { QuizTypeValues } from "Store/quiz/types";
import { useDispatch } from "react-redux";
import { requestQuizList } from "Store/quiz/actions";

type QuizzesCardProps = {
  origin?: boolean;
  editMode?: boolean;
  gridName?: string;
};

const QuizzesCard: FC<QuizzesCardProps> = ({ origin, editMode, gridName }) => {
  const isMobile = useDeviceType();
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { userStudent } = useSelector((state: RootState) => state.user);
  const { quizzes, isLoading: quizLoading } = useSelector(
    (state: RootState) => state.quiz
  );

  const [search, setSearch] = useState<string>();
  const [filter, setFilter] = useState(false);

  const handleUpdate = () => {
    dispatch(requestQuizList({ uid: userStudent?.tutorID || "" }));
  };

  return (
    <Card
      gridName={gridName}
      title={t("dashboard.allQuizzes")}
      isEmpty={quizzes?.length === 0}
      emptyMessage={t("dashboard.emptyNoQuiz")}
      scrollable
      searchable
      searchValue={search}
      setSearch={(e) => setSearch(e)}
      redirectTo={origin ? "" : "Quizzes"}
      redirectPath={origin ? "" : "/quizzes"}
      isLoading={quizLoading}
      innerCard={isMobile}
      setOrder={(order) => setFilter(order)}
      update={userStudent && handleUpdate}
    >
      <List<QuizTypeValues>
        content={quizzes || []}
        renderItem={(item) => (
          <RenderQuizCard item={item} editMode={editMode} />
        )}
        search={search}
        filter={filter}
        itemKey={"title"}
        emptyState={t("dashboard.emptyQuiz")}
      />
    </Card>
  );
};

export default QuizzesCard;
