import React, { useEffect, useState } from "react";
import * as Styled from "../styled";
import Card from "components/Card";
import RenderQuizCard from "components/renderItems/RenderQuizCard";
import RenderStudentCard from "components/renderItems/RenderStudentCard";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useDispatch } from "react-redux";
import { requestStudentList } from "Store/students/actions";
import { requestQuizList } from "Store/quiz/actions";
import TutorResultTable from "components/Table/TutorResultTable";
import useDeviceType from "hooks/useDeviceType";
import Tabs from "components/Tabs";
import { useTranslation } from "react-i18next";

export const TutorPage = () => {
  const { students, isLoading } = useSelector(
    (state: RootState) => state.student
  );
  const { quizzes, isLoading: quizLoading } = useSelector(
    (state: RootState) => state.quiz
  );
  const { user } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const isMobile = useDeviceType();

  const userID = user?.info?.uid;

  const [search, setSearch] = useState<string>();
  const [searchStudents, setSearchStudents] = useState<string>();
  const [tableIsEmpty, setTableIsEmpty] = useState(false);
  const [tab, setTab] = useState("Quizzes");

  const filterStudents = students?.filter((e) =>
    e.info?.name.toUpperCase().includes(searchStudents?.toUpperCase() || "")
  );

  const filterQuizzes = quizzes?.filter((e) =>
    e.title.toUpperCase().includes(search?.toUpperCase() || "")
  );

  useEffect(() => {
    if (students === undefined) {
      dispatch(requestStudentList({ uid: userID || "" }));
    }
  }, [dispatch, students, userID]);

  useEffect(() => {
    if (quizzes === undefined) {
      dispatch(requestQuizList({ uid: userID || "", size: 50 }));
    }
  }, [dispatch, quizzes, userID]);

  return (
    <Styled.Container>
      {isMobile && (
        <Styled.TabContainer>
          <Tabs
            tabs={[
              { label: t("dashboard.labelQuizzes") },
              { label: t("dashboard.labelStudents") },
              { label: t("dashboard.labelResults") },
            ]}
            activeTab={(tab) => setTab(tab)}
            radius={5}
          />
        </Styled.TabContainer>
      )}
      {(tab === t("dashboard.labelQuizzes") || !isMobile) && (
        <Card
          gridName="card1"
          title={isMobile ? "" : t("dashboard.allQuizzes")}
          isEmpty={filterQuizzes?.length === 0}
          emptyMessage={
            search ? t("dashboard.emptyQuiz") : t("dashboard.emptyNoQuiz")
          }
          scrollable
          searchable
          searchValue={search}
          setSearch={(e) => setSearch(e)}
          redirectTo={"Quizzes"}
          redirectPath="/quizzes"
          isLoading={quizLoading}
          innerCard={isMobile}
        >
          {filterQuizzes?.map((item) => {
            return <RenderQuizCard item={item} editMode />;
          })}
        </Card>
      )}
      {(tab === t("dashboard.labelStudents") || !isMobile) && (
        <Card
          gridName="card3"
          title={isMobile ? "" : t("dashboard.students")}
          isEmpty={filterStudents?.length === 0}
          emptyMessage={
            searchStudents
              ? t("dashboard.emptyStudent")
              : t("dashboard.emptyNoStudent")
          }
          scrollable
          searchable
          searchValue={searchStudents}
          setSearch={(e) => setSearchStudents(e)}
          redirectTo={t("dashboard.redirectStudents")}
          redirectPath="/students"
          isLoading={isLoading}
          innerCard={isMobile}
        >
          {filterStudents?.map((item) => {
            if (item.info) {
              return <RenderStudentCard item={item.info} />;
            }
            return null;
          })}
        </Card>
      )}
      {(tab === t("dashboard.labelResults") || !isMobile) && (
        <Card
          gridName="card2"
          title={isMobile ? "" : t("dashboard.results")}
          isEmpty={tableIsEmpty}
          emptyMessage={t("dashboard.emptyResult")}
          redirectTo={t("dashboard.redirectResults")}
          redirectPath="/results"
          isLoading={quizLoading}
          innerCard={isMobile}
        >
          <TutorResultTable
            dashBoard
            emptyState={(empty) => setTableIsEmpty(empty)}
          />
        </Card>
      )}
    </Styled.Container>
  );
};
