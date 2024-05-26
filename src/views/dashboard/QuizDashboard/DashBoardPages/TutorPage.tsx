import React, { useEffect, useState } from "react";
import * as Styled from "../styled";
import Card from "components/Card";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useDispatch } from "react-redux";
import { requestStudentList } from "Store/students/actions";
import { requestQuizList } from "Store/quiz/actions";
import TutorResultTable from "components/Table/TutorResultTable";
import useDeviceType from "hooks/useDeviceType";
import Tabs from "components/Tabs";
import { useTranslation } from "react-i18next";
import * as Block from "blocks/Dashboard";

export const TutorPage = () => {
  const { students } = useSelector((state: RootState) => state.student);
  const { quizzes, isLoading: quizLoading } = useSelector(
    (state: RootState) => state.quiz
  );
  const { user } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const isMobile = useDeviceType();

  const userID = user?.info?.uid;

  const [tableIsEmpty, setTableIsEmpty] = useState(false);
  const [tab, setTab] = useState("Quizzes");

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
        <Block.QuizzesCard />
      )}
      {(tab === t("dashboard.labelStudents") || !isMobile) && (
        <Block.StudentsCard />
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
